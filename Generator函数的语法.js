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
// 1 2 3 4 5
for(let v of foo()){
    console.log(v);
}


//利用Generator函数和for...of函数,实现斐波那契数列的例子
console.log("\n\n分割线..................");
function * fibonacci() {
    let [pre, curr] = [0, 1];
    for (;;){
        [pre, curr] = [curr, pre + curr];
        yield curr;
    }
}

for(let  n of fibonacci()){
    if (n > 10000) break;
    console.log(n);
}

//由上可见,使用for...of语句不需要使用next方法




//利用for...of循环,可以写出遍历任何对象(object)的方法。原生的JavaScript对象没有遍历接口,无法使用for...of循环,通过
//Generator函数为它加上这个接口,就可以用了
console.log("\n\n分割线..................");
function *objectEntries(obj) {
    let propkeys = Reflect.ownKeys(obj);
    for(let propkey of propkeys){
        yield [propkey, obj[propkey]];
    }
}
let  jane = {first:"jame", last :"Done"};
for(let [key, value] of  objectEntries(jane)){
    console.log("${key}: ${value}");
}




//加上遍历器接口的另一种写法是,将Generator函数加到对象的Symbol.iterator属性上面
console.log("\n\n分割线..................");
function *objectEntries() {
    let propkeys = Object.keys(this);
    for(let propkey of propkeys){
        yield [propkey, this[propkey]];
    }
}
let  jane2 = {first:"jane", last:"Doe"};
jane2[Symbol.iterator] = objectEntries;
for(let [key,value] of jane2){
    console.log("${key}:${value}");
}




//出了for...of循环外,扩展运算符(...)、解构赋值和Array.from方法内部调用的,都是遍历接口。这意味着,它们都可以将Generator函数
//返回Iterator对象,作为参赛
console.log("\n\n分割线..................");
function *numbers() {
    yield 1;
    yield 2;
    return 3;
    yield 4
}
//扩展运算符
[...numbers()]  //[1,2]

//array.from 方法
Array.from(numbers()) //[1,2]

//解构赋值
let [x,y] = numbers();
console.log(x);  //1
console.log(y);//2

//for...of循环
for(let n of numbers()){
    console.log(n);  // 1,2
}




//Generator.prototype.throw()
/*
console.log("\n\n分割线..................");
var g = function *() {
    try{
        yield ;
    }catch (e){
        console.log("内部捕获", e);
    }
};
var i = g();
i.next();
try{
    i.throw("a");
    i.throw("b");
}catch (e){
    console.log("外部捕获", e);
}
*/



//throw方法可以接受一个参数,该参数会被catch语句接受,建议抛出Error对象的实例
/*
console.log("\n\n分割线..................");
var g1 = function *() {
    try{
        yield ;
    }catch (e){
        console.log(e);
    }
};
var i1 = g1();
i1.next();
i1.throw(new  Error("出错了!"));
    */




//
/*
console.log("\n\n分割线..................");
var g = function *() {
    while (true){
        try {
            yield ;
        }catch  (e) {
            if (e != "a") throw  a;
            console.log("内部捕获", e);
        }
    }
};
var  i = g();
i.next();
try {
    throw new Error("a");
    throw new Error("b");
}catch (e){
    console.log("外部捕获", e);
}
    */






//如果Generator函数内部没有部署try...catch代码块,那么throw方法抛出的错误,将会被外部try...catch代码块捕获
//g内没有部署try...catch代码块,抛出的错误直接被外部catch代码块捕获
console.log("\n\n分割线..................");
var g = function *() {
    while (true){
        yield ;
        console.log("内部捕获", e);
    }
};

var i = g();
i.next();

try {
    i.throw("a");
    i.throw("b");
}catch (e){
    console.log("外部捕获",e);
}






//如果Generator函数内部和外部,没有部署try...catch代码块,那么程序将报错,直接中断执行
console.log("\n\n分割线..................");
var gen2 = function *gen() {
    yield console.log("hello");
    yield console.log("world");
}
var g2 = gen2();
g2.next();   //hello
// g2.throw(); //uncaught undefined





//throw方法被捕获后,会附带执行下一条yield语句。也就是说,会附带执行一次next方法
console.log("\n\n分割线..................");
var gen3 = function *gen() {
    try {
        yield console.log("a");
    }catch (e){
        console.log("catch");
    }
    yield console.log("b");
    yield console.log("c");
}
var g3 = gen3();
g3.next(); //a
//g.throw方法被捕获后,自动执行一次next方法,所以会打印b
g3.throw(); //b
//只要Generator函数内部部署了try...catch代码块,那么遍历器的throw方法抛出的错误,不影响下一次遍历
g3.next();   //c




//throw命令和g.throw方法是无关的,两者互不影响
console.log("\n\n分割线..................");
var gen4 = function *gen() {
    yield console.log("hello");
    yield console.log("world");
}
var g4 = gen4();
g4.next();

try{
    throw new Error();
}catch (e){
    g4.next();
}





//Generator函数体内抛出的错误,也可以被函数体外的catch捕获
// console.log("\n\n分割线..................");
// function *foo() {
//     var x = yield 3;
//     var y = x.toUpperCase();
//     yield y;
// }
// var it = fo();
// it.next(); //{value:3, done:false}
// try {
//     it.next(42);
// }catch (err){
//     console.log(err);
// }
//




//一旦Generator执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。
// 如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，
// 即JavaScript引擎认为这个Generator已经运行结束了。
console.log("\n\n分割线..................");
function *g6() {
    yield 1;
    console.log("throwing an exception");
    throw new Error("generator broke!");
    yield 2;
    yield 3;
}
function log(generator) {
    var v;
    console.log("starting generator");
    try{
        v = generator.next();
        console.log("第一次运行next方法",v);
    }catch (err){
        console.log("捕获错误", v);
    }

    try {
        v = generator.next();
        console.log("第二次运行next方法", v);
    }catch (err){
        console.log("捕获错误", v);
    }

    try{
        v =generator.next();
        console.log("第三次运行next方法", v);
    }catch (err){
        console.log("捕获错误", v);
    }

    console.log("caller done");
}

log(g6());

// starting generator
// 第一次运行next方法 { value: 1, done: false }
// throwing an exception
// 捕获错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done
// 执行了




//Generator.prototype.return()
//Generator函数返回的遍历对象,还有一个return方法,可以返回给定的值,并且终结遍历Generator函数
//调用return方法后,返回的value属性就是return方法的参数,并且done属性总是为true
//以后再调用next方法,value属性总是为undefined,done属性总是为true
console.log("\n\n分割线..................");
function *gen7() {
    yield 1;
    yield 2;
    yield 3;
}
var g7 = gen7();
console.log(g7.next());  //{ value: 1, done: false }
console.log(g7.return("foo"));  //{ value: 'foo', done: true }
console.log(g7.next());     //{ value: undefined, done: true }



//如果return方法调用时,不提供参数,则返回的value属性为undefined
console.log("\n\n分割线..................");
function *gen8() {
    yield 1;
    yield 2;
    yield 3;
}
var g8 = gen8();
console.log(g8.next());  //{ value: 1, done: false }
console.log(g8.return());   //{ value: undefined, done: true }





//如果Generator函数内部有try...finally代码块,那么return方法会推迟到finally代码执行完后再执行
//调用return方法后，就开始执行finally代码块，然后等到finally代码块执行完，再执行return方法。
console.log("\n\n分割线..................");
function *numbers1() {
    yield 1;
    try{
        yield 2;
        yield 3;
    }finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g9 = numbers1();
console.log(g9.next()); //{ value: 1, done: false }
console.log(g9.next()); //{ value: 2, done: false }
console.log(g9.return(7)); //{ value: 4, done: false }
console.log(g9.next());  //{ value: 5, done: false }
console.log(g9.next());   //{ value: 7, done: true }





//yield * 语句
//如果在Generator函数内部,调用另一个Generator函数,默认情况下是没有效果的
console.log("\n\n分割线..................");
function *foo10() {
    yield "a";
    yield "b";
}
function *bar() {
    yield "x";
    foo10();
    yield "y";
}
for(let  v of bar()){
    console.log(v); // x, y
}



//如果想有效果,必须使用 yield*语句
console.log("\n\n分割线..................");
function *bar() {
    yield "x";
    yield  *foo10();
    yield  "y";
}
// //等同于
// function *bar() {
//     yield "x";
//     yield "a";
//     yield "b";
//     yield "y";
// }
//
// //等同于
// function *bar() {
//     yield "x";
//     for(let v of foo10()){
//         yield v;
//     }
//     yield "y";
// }

for(let v of bar()){
    console.log(v); //x,a,b,y
}






//对比示例
console.log("\n\n分割线..................");
function *inner() {
    yield "hello!";
}
function *outer1() {
    yield "open";
    yield inner();
    yield "close";
}
var gen = outer1();
console.log(gen.next().value);      //open
console.log(gen.next().value);      //返回一个遍历器对象
console.log(gen.next().value);       //"close"

function * outer2() {
    yield 'open';
    yield * inner();
    yield "close";
}

var gen = outer2();
console.log(gen.next().value);      //open
console.log(gen.next().value);      //hello
console.log(gen.next().value);      // close



//从语法角度讲,如果yield命令后面跟的是一个遍历器对象,需要在yield命令后面加上星号,标明它返回的是一个遍历器对象。这称为yield*语句
console.log("\n\n分割线..................");
let delegatedIterator = (function *() {
    yield "hello";
    yield "bye";
}());

let delegateingIterator = (function *() {
    yield "greetings";
    yield *delegatedIterator;
    yield "ok, bye";
}()) ;
for(let  value of delegateingIterator){
    console.log(value);  //greetings hello bye ok bye
}
//上面代码中，delegatingIterator是代理者，delegatedIterator是被代理者。
// 由于yield* delegatedIterator语句得到的值，是一个遍历器，所以要用星号表示。
// 运行结果就是使用一个遍历器，遍历了多个Generator函数，有递归的效果。
//yield*后面的Generator函数(没有return语句时),等同于在Generator函数内,部署了一个for...of循环


function *concat(iter1, iter2) {
    yield * iter1;
    yield * iter2;
}
//等同于
function *concat(iter1, iter2) {
    for(var value of iter1){
        yield  value;
    }
    
    for(var value of iter2){
        yield value;
    }
}




//如果yield*后面跟着一个数组,由于数组原生支持遍历器,因此就会遍历数组成员
//如果yield命令后面不加星号,返回的是整个数组。加上星号就表示返回的是数组的遍历器对象
function *gen() {
    yield * ["a", "b", "c"];
}
gen().next();



//任何数据结构只要有Iterator接口,就可以被yield*遍历
let read = (function *() {
    yield "hello";
    yield * "hello";
})();
//yield 语句返回整个字符串
console.log(read.next().value); //hello
//yield *语句返回单个字符。因为字符串有Iterator接口,所以被yield*遍历
console.log(read.next().value); // h




//如果被代理的Generator函数有return语句,那么就可以向代理它的Generator函数返回数据
function *foo() {
    yield 2;
    yield 3;
    return "foo";
}
function *bar() {
    yield 1;
    var v = yield *foo();
    console.log("v:" + v);
    yield 4;
}

var it = bar();
it.next();  //{value:1, done:false}
it.next(); //{value:2, done:false}
it.next(); //{value:3, done:false}
it.next(); //"v:foo"  {value:4, done:false}
it.next(); //{value:undefined, done:true}



//再看一个例子
function *genFuncWithReturn() {
    yield "a";
    yield "b";
    return "the result"
}
function *logReturned(genObj) {
    let result = yield *genObj;
    console.log(result);
}
[...logReturned(genFuncWithReturn())]; //值为[a,b]   the result




//yield*命令可以很方便的取出嵌套数组的所有成员
function * iterTree(tree) {
    if (Array.isArray(tree)){
        for(let i=0; i<tree.length; i++){
            yield *iterTree(tree[i]);
        }
    } else {
        yield tree;
    }
}
const tree = ["a", ["b", "c"], ["d", "e"]];
for(let x of iterTree(tree)){
    console.log(x);
}








//下面是一个稍微复杂的例子,使用yield*语句遍历完全二叉树
//下面是二叉树的构造函数,三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
    this.left =  left;
    this.label = label;
    this.right = right;
}

//下面是中序(inorder)遍历函数
//由于返回的是一个遍历器,所以要用Generator函数
//函数体内采用递归算法,所以左树和右树要用yield*遍历
function *inorder(t) {
    if (t){
        yield *inorder(t.left);
        yield t.label;
        yield *inorder(t.right);
    }
}

//下面生产二叉树
function make(array) {
    //判断是否为叶节点
    if(array.length == 1) return new Tree(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
}

let Tree = make([[["a"], "b", ["c"]], "d", [["e"], "f", ["g"]]]);

//遍历二叉树
var result = [];
for(let node of inorder(tree)){
    result.push(node);
}
console.log(result); //// ['a', 'b', 'c', 'd', 'e', 'f', 'g']







//作为对象属性的Generator函数
//如果一个对象的属性是Generator函数,可以简写为下面的形式
let obj = {
    * myGeneratorMethod(){
        //some code
    }
};

//等价于下面的写法
let obj = {
    myGeneratorMethod: function *() {

    }
};





//Generator函数的this
//Generator函数返回的遍历器,是该函数的实例,继承该函数prototype对象上的方法。
function *g() {};
g.prototype.hello = function () {
    return "hi";
}
let obj = g();
obj instanceof  g; //true
obj.hello(); //hi

//但是如果把generator函数当成普通的构造函数,并不会生效,因为返回的是遍历器对象,不是this对象
function *g() {
    this.a = 1;
}
let  obj = g();
obj.a; //undefined

//Generator函数和new命令一起用,也会报错
function *F() {
    yield this.x = 2;
    yield this.y = 3;
}
// return F();  //F is not a  constructor






//Generator与状态机
//Generator是实现状态机的最佳结构。比如,下面的clock函数就是一个状态机
var ticking = true;
var clock = function () {
    if (ticking){
        console.log("tick");
    }else {
        console.log("tock")
    }
    ticking = !ticking;
}

//generator函数实现
var clock = function *() {
    while (true){
        console.log("tick");
        yield ;
        console.log("tock");
        yield ;
    }
};





//Generator与协程






//Generator应用
//异步操作的同步化表达
function *loadUI() {
    showLoadingScreen();
    yield loadUIDataAsynchronously();
    hideLoadingScreen();
}
var loader = loadUI();
//加载UI
loader.next();
//卸载UI
loader.next();




//使用Generator函数部署Ajax操作
function *main() {
    var result = yield request("http://some.url");
    var resp = JSON.parse(result);
    console.log(resp.value);
}
function request(url) {
    makeAjaxCall(url, function (response) {
        it.next(response);
    });
}
var it = main();
console.log(it.next());

























