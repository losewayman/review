// 1. 模拟实现call
// call方法接收一个指定的this值和参数列表，被函数调用
function useCall(x,y){
    console.log(this.a,x,y)
}
useCall("x","y"); // undefined 'x' 'y'
useCall.call({a:"call"},"a","b") // a a b

//模拟实现
Function.prototype.recall = function(_this,...arg){
    _this = _this?_this:window;
    _this.fn = this;
    let res = _this.fn(...arg);
    delete _this.fn;
    return res;
}
useCall.recall({a:"recall"},"a","b") // a a b

//2. 模拟实现apply
// apply方法同call方法作用相同，不过call后续参数以列表接收，apply以数组形式接收
useCall.apply({a:'apply'},["arg1","arg2"]);
// 模拟实现
Function.prototype.reapply = function(_this,arrArg=[]){
    _this = _this?_this: window;
    _this.fn = this;
    let res = _this.fn(...arrArg);
    delete _this.fn;
    return res;
}
useCall.reapply({a:'reapply'},["arg1","arg2"])

//3. 模拟实现bind
// bind接收参数方式同call,不过他返回一个改变了this指向的函数。
let a =  useCall.bind({a:'bind'},"arg1","arg2");
a()

// 模拟实现
Function.prototype.bind = function(_this,...args){
    _this = _this?_this:window;
    _this.fn = this;
    return function(){
        return _this.fn(...args);
    }
}
useCall.bind({a:'rebind'},'arg1','arg2')();

// 4. instanceof模拟实现
// instanceof 判断 A 是否为 B 的实例。 其原理是检测 A 的原型链中是否有原型与 B 的原型相同。
function instanceofRe(left,right){
    left = Object.getPrototypeOf(left);
    right = right.prototype;
    while(left){
        if(left === right) return true
        left = Object.getPrototypeOf(left);
    }
    return false;
}
console.log("instanceofRe",instanceofRe([],Array))
// 5.防抖
function func1(fn,time){
    let timer;
    return function(){
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn();
        },time)
    }
}
let fandou = func1(()=>{console.log("防抖");},100)

// 6.节流
function func2(fn,time){
    let flag = true;
    return function(){
        if(flag){
            flag = false;
            fn();
            setTimeout(()=>{
                flag = true;
            },time)
        }
    }
}
let jieliu = func2(()=>{console.log("节流")},3000)