/**
 * Created by barry on 2017/3/14.
 */


//基本概念

//Generator函数是一个状态机,封装了多个内部状态
function * helloWorldGenerator() {
    yield "hello";
    yield "world";
    return "ending";
}
//执行返回一个遍历器对象,也就是说这个函数不仅是一个状态机,还是一个遍历器对象生成函数
var  hw = helloWorldGenerator();
console.log(hw);  //{}
console.log(hw.next());//{ value: 'hello', done: false }
console.log(hw.next());//{ value: 'world', done: false }
console.log(hw.next());//{ value: 'ending', done: true }
console.log(hw.next());//{ value: undefined, done: true }
//一共调用四次 next()方法
console.log(hw.next())//{ value: undefined, done: true }




//yield语句
function *f() {
    console.log("执行了");
}
var generator = f(); //不执行
//只有调用了next()函数才会执行
setTimeout(function () {
    generator.next()
}, 10);

//yield语句只能用在Generator函数里,用在其他地方会报错
/*
(function () {
    yield 1;
})();
 */


//下面代码也会产生语法错误,因为forEach方法的参数是一个普通函数
/*
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
    a.forEach(function (item) {
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item;
        }
    }
};

for (var f of flat(arr)){
    console.log(f);
}
*/


//可以改用for循环
var arr = [1,[[2,3],4],[5,6]];
var flat = function *(a) {
    var length = a.length;
    for(var i=0; i<length;i++){
        var item = a[i];
        if(typeof item !== "number"){
            yield  * flat(item);
        }else {
            yield  item;
        }
    }
};

for (var f of flat(arr)){
    console.log(f); // 1,2,3,4,5,6
}




//如果yield语句如果用在一个表达式中,就必须放在括号里面
function *demo() {
    // console.log("hello"+yield ); //syntaxError
    // console.log("hello"+yield ); //syntaxError
    console.log("hello"+(yield )); //ok
    console.log("hello"+(yield 123)); //ok
}




//与Iterator接口的关系
//任何一个对象的symbol.iterator方法,等于该对象的遍历器生成函数,调用该函数会返回该对象的一个遍历器对象
//由于Generator函数就是遍历器生成函数,因此可以把Generator赋值给对象的symbol.iterator属性,从而使得该对象具有Iterator接口
var myIterable = {};
myIterable[Symbol.iterator] = function *() {
    yield 1;
    yield 2;
    yield 3;
};
console.log([...myIterable]);//...运算符遍历

//Generator函数执行后,返回一个遍历器对象。该对象本身也具有Symbol.iterator属性,执行后返回自身
function *gem() {
    //some code
}
var g = gem();
g[Symbol.iterator]() === g; //true
//上面的代码中,gen是一个Generator函数,调用它会生成一个遍历器对象g。它的Symbol.iterator属性,也是一个遍历器对象生成函数,执行后返回自己




//next方法的参数
console.log("\n\n分割线..................")
function *f1() {
    for(var i=0; true; i++){
        var reset = yield  i;
        if(reset){i = -1};
    }
}
var g = f1();
console.log(g.next()); //{ value: 0, done: false }
console.log(g.next());  //{ value: 1, done: false }
console.log(g.next(true)); //{ value: 0, done: false }



console.log("\n\n分割线..................")
function *foo(x) {
    var y = 2 * (yield (x+1));
    var z = yield (y / 3);
    return (x + y + z);
}
var a = foo(5);
console.log(a.next()); //{ value: 6, done: false }
console.log(a.next()); //{ value: NaN, done: false }
console.log(a.next()); // { value: NaN, done: true }

var b = foo(5);
console.log(b.next()); //{ value: 6, done: false }
console.log(b.next(12)); //{ value: 8, done: false }
console.log(b.next(13)); // { value: 42, done: true }


//如果想在第一次调用next方法时,就能够输入值,可以再Generator函数外面再包一层
console.log("\n\n分割线..................");
function wrapper(generatorFunction) {
    return function (...args) {
        let generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    };
}

const  wrapped = wrapper(function *() {
    console.log("First input:${yield}");
    return "Done";
});
wrapped().next("hello");



//再看一个通过next方法的参数,向Generator函数内部输入值得例子
console.log("\n\n分割线..................");
function *dataConsumer() {
    console.log("Started");
    console.log("1.${yield}");
    console.log("1.${yield}");
    return "result";
}
let genObj = dataConsumer();
genObj.next(); //started
genObj.next("a"); //1.a
genObj.next("b"); //2.b






//for...of循环
console.log("\n\n分割线..................");
function *foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

for(let v of foo()){
    console.log(v);
}