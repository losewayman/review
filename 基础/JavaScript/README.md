### 1.基本数据类型

基本数据类型（7 种）：String,Number,Boolean,null,undefined,Symbol,BigInt  
引用数据类型（1 种）：Object

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
