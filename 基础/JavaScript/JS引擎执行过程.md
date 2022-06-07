## js 引擎执行过程

js 引擎执行代码分为三个阶段：  
语法分析  
预编译阶段  
执行阶段

> tips：浏览器首先按顺序加载由\<script> 标签分割的 js 代码块，加载 js 代码块完毕后，立刻进入以上三个阶段，然后再按顺序查找下一个代码块，再继续执行以上三个阶段，无论是外部脚本文件（不异步加载）还是内部脚本代码块，都是一样的原理，并且都在同一个全局作用域中。

### 语法分析

脚本代码块加载完毕后，会首先进入语法分析阶段。该阶段主要作用是：
分析该 js 脚本代码块的语法是否正确，如果出现不正确，则向外抛出一个语法错误（SyntaxError），停止该 js 代码块的执行，然后继续查找并加载下一个代码块；如果语法正确，则进入预编译阶段

### 预编译阶段

#### js 运行环境

js 的运行环境可分为三类：  
1.全局运行环境（代码加载完毕后，进入预编译即进入全局环境）  
2.函数运行环境（函数调用执行时进入函数环境，不同函数其函数环境都是不同的）  
3.eval 运行环境(因为安全，性能等问题几乎已经遗弃)

> 每进入一个运行环境，都会创建一个对应的<font color="red">执行上下文</font>,在执行一段 js 代码时一般都会创建多个执行上下文，js 引擎以栈的方式对这些执行上下文进行管理，形成<font color="red">函数调用栈</font>,栈顶是当前执行上下文，栈底是全局执行上下文。

#### 执行上下文创建过程

> 根据不同版本的规范，具体创建过程也不相同。但做的事大致都是相同的。  
> ES5 过程为：  
> 确定 this 指向  
> 构建作用域链  
> 创建变量对象

1.LexicalEnvironment（词法环境） 组件被创建。  
2.VariableEnvironment（变量环境） 组件被创建。

##### LexicalEnvironment（词法环境）

词法环境由三部分组成：  
1.环境记录(Environment Record)  
2.对外部环境的引用(Reference to the outer environment)  
3.确定 this 值(This binding)

词法环境可分为 全局词法环境 和 函数词法环境  
全局词法环境：没有外部环境引用，其引用为 null.  
函数词法环境：对外部环境的引用可以是全局环境，也可以是外部函数环境。

```
GlobalExectionContext = {  // 全局执行上下文
  LexicalEnvironment: {    	  // 词法环境
    EnvironmentRecord: {   		// 环境记录
      Type: "Object",      		   // 全局环境
      // 标识符绑定在这里
    }
    outer: <null>,    		   // 对外部环境的引用
    this: <global object>
  }
}

FunctionExectionContext = { // 函数执行上下文
  LexicalEnvironment: {  	  // 词法环境
    EnvironmentRecord: {  		// 环境记录
      Type: "Declarative",  	   // 函数环境
      // 标识符绑定在这里
    }
    outer: <Global or outer function environment reference>,   // 对外部环境的引用
    this: <depends on how function is called>
  }
}
```

##### VariableEnvironment（变量环境）

在 ES6 中，词法环境 和 变量环境 的区别在于前者用于存储函数声明和变量（ let 和 const ）绑定，而后者仅用于存储变量（ var ）绑定。

例子：

```
let a = 20;
const b = 30;
var c;

function multiply(e, f) {
 var g = 20;
 return e * f * g;
}

c = multiply(20, 30);
```

执行上下文如下所示：

```
GlobalExectionContext = { //全局执行上下文

  LexicalEnvironment: {  // 词法环境
    EnvironmentRecord: {  // 环境记录，let,const,函数声明在这里
      Type: "Object",
      // 标识符绑定在这里
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>, // 全局环境外部引用为null
    ThisBinding: <Global Object> // this指向
  },

  VariableEnvironment: {  // 变量环境
    EnvironmentRecord: {  // var变量声明
      Type: "Object",
      // 标识符绑定在这里
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}

FunctionExectionContext = {

  LexicalEnvironment: {  // 词法环境
    EnvironmentRecord: {  //环境记录，包括传入参数
      Type: "Declarative",
      // 标识符绑定在这里
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>, // 外部词法环境引用
    ThisBinding: <Global Object>,
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 标识符绑定在这里
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object>,
  }
}
```

##### 执行上下文创建时变量声明过程

1.创建 arguments 对象，将函数所有形参在词法环境 环境记录上保存，无对应实参数为 undefined。（仅函数环境）  
2.函数声明，按照代码顺序检查当前执行上下文的函数声明(即 function 关键字声明的函数)，在词法环境环境记录上以函数名建立一个属性，属性值为指向该函数在内存地址的引用。如果该属性已存在，则会被新的引用覆盖。  
3.变量声明，检查当前执行上下文的变量声明，每找到一个就以变量名建立一个属性，若属性已存在，为防止同名函数被修改为 undefined，则会直接跳过。var 声明的变量会被初始化为 undefined 保存在变量环境环境记录上，而 let，const 声明的变量不会被初始化，保存在词法环境环境记录上。所以在 var 定义变量之前访问变量是 undefined，在 let，const 定义变量之前访问变量会报错。  
*函数声明的优先级比变量声明高。  
*创建执行上下文发生在预编译阶段，尚未进入执行阶段，该执行上下文是不能访问的。只有进入执行阶段以后，执行上下文中的变量属性被赋值后，才能访问。

#### 外部词法环境引用（作用域链）

每创建一个执行上下文，都会创建对应的词法环境。词法环境由环境记录，外部词法环境引用和 this 指向组成。  
外部词法环境引用（作用域链）层层链接，形成作用域链。外部词法环境引用指向函数定义时包裹他的那个作用域的词法环境（应该也包括变量环境）。在全局执行上下文中，外部指向时 null。查找变量或函数引用时，首先从当前的词法环境中进行寻找，如果没找到，就找上层（词法层面）的词法环境，直到找到或到达顶层词法环境为止。

#### this 指向

1. 在全局环境下 this 指向 window。
2. 在函数内部，this 取决于函数被调用的方式：
   非严格模式下，在没有函数调用对象时函数内 this 指向全局对象 window，严格模式下指向 undefined.
3. 有函数调用情况下，函数内 this 指向这个调用对象。  
   call,apply,bind 可以改变 this 指向，使 this 指向第一个参数。
4. new 操作符构建新对象过程中，这个新对象会绑定构造函数的 this。
5. 箭头函数中的 this 指向它的外层词法环境的 this 引用。

### 执行阶段

代码执行，将对应的变量赋值。let 只声明未赋值的变量被赋值 undefined;
