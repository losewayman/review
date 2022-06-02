### 1.基本数据类型

基本数据类型（7 种）：String,Number,Boolean,null,undefined,Symbol,BigInt  
引用数据类型（1 种）：Object

#### BigInt

BigInt 是一种内置对象，提供了一种表示大于 2^53 - 1 的整数的方法。BigInt 可以表示任意大的整数。
有两种表示方法：

1. 在整数字面量后面加 n 定义一个 BigInt;
2. 调用函数 BigInt()并传递一个整数或字符串值 (没有 new 运算符)；

```
const bigIntNum1 = 122n;
const bugIntNum2 = BigInt(122);// BigInt('122');
```

使用方面：
类似于 Number

1. 但是不能用于 Math 对象中的方法
2. 不能和 Number 类型混合运算，必须转换成同一种类型
3. BigInt 类型转换为 Number 时需要小心，因为 Number 能准确表达的数字范围为-2^53 - 1 到 2^53 - 1 超出这个范围 Number 会丢失精度（即不能被准确区分）。当超过这个范围的 BigInt 被转换为 Number 时就可能出问题。
4. BigInt 的类型是 bigint
5. BigInt 类型之间可以通过各种运算符运算
6. BigInt 可以和 Number 比较

```
Math.abs(-100n;) // typeerror
1+1n // typeerror
Number(183n)  // 183 number类型
typeof 100n  // bigint
10n+2n // 12n
10<100n  // true
```

### 2.数据类型判断

#### 1.typeof

基本数据类型除了 null 以外都能正确判断,null 返回'object'  
引用数据数据类型除了 function 以外都返回'object'

#### 2.instanceof

instanceof 判断 A 是否为 B 的实例。 其原理是检测 A 的原型链中是否有原型与 B 的原型相同。

```
[] instanceof Array // true
```

#### 3. Object.prototype.toString.call()

toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object xxx] ，其中 Xxx 就是对象的类型。

```
Object.prototype.toString.call([]) // '[object array]'
```

### 3.类型转换

单个对象在隐式类型转换时若预期转换为

- 数字则先调用 valueOf()，若返回不是基本类型值或没有这个方法再调用 toString()。
- 字符串则先调用 toString(),若返回不是基本类型值或没有这个方法再调用 valueOf()。
- [Symbol.toPrimitive]属性方法存在时优先调用此属性方法。

多个类型运算

- 如果有一个是对象，则遵循对象对原始值的转换过程(Date 对象直接调用 toString 完成转换，其他对象通过 valueOf 转化，如果转换不成功则调用 toString)
- 如果两个都是对象，两个对象都遵循步骤 1 转换到字符串
- 两个数字，进行算数运算
- 两个字符串，直接拼接
- 一个字符串一个数字，直接拼接为字符串

#### 1.Boolean 类型转换

null,undefined,"",0,false,NaN 都会转为 false，其余所有值或对象都转为 true，包括空数组和空对象。

#### 2.toString()方法

1. 每个对象都有一个 toString()方法，默认情况下 toString()方法返回该对象的类型,"[object,type]"，type 为调用对象的类型。可以用 Object.prototype.toString.call(测试内容)来判断测试内容的类型。不直接调用上因为其他一些类型覆盖实现了 toString();
2. Array 覆盖实现了 toString(),返回用逗号连接的数组元素的字符串。
3. Number 覆盖实现了 toString(),以指定基数返回该数字的字符串表示。未指定基数默认为 10。
4. Function 覆盖实现了 toString(),返回函数的字符串表示。

```
let a = {}
a.toString() // "[object object]"
Object.protoType.toString.call(1) // "[object Number]"
[1,2,3,4,5].toString() // "1,2,3,4,5"
(12).toString() // '12'
(12).toString(2) // '1100'
(12).toString(8) // '14'
(12).toString(16) // 'c'
let b = () => {}
b.toString() // '() => {}'
```

#### 3. valueOf()方法

各种对象类型对应的 valueOf 返回值。  
Array 数组本身  
Boolean 布尔值  
Date 返回毫秒形式的时间戳  
Function 函数本身  
Number 数字值  
Object 对象本身  
String 字符串值

#### 4.[Symbol.toPrimitive]

```
MDN：Symbol.toPrimitive 是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数。
```

作用：同 valueOf()和 toString()一样，但是优先级要高于这两者；
该函数被调用时，会被传递一个字符串参数 hint，表示当前运算的模式，一共有三种模式：  
string：字符串类型  
number：数字类型  
default：默认,该场合可以转成数值，也可以转成字符串
