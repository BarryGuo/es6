/**
 * Created by barry on 2017/3/8.
 */


// var tmp = new Date();
// function f() {
//     console.log(tmp);
//     if(true){
//         var tmp = "hello world";
//     }
// }
//
// console.log(tmp);
// f();

// var a =1;
// (function f1() {
//     console.log("f1"+a);
//     var a = 2;
//     (function f2() {
//         console.log("f2"+a);
//         var a = 3;
//         (function () {
//             console.log("f3"+a);
//         })();
//     })();
// })();




// var a ;
// function f1() {
//     var a ;
//     function f2() {
//         var  a ;
//         function f3() {
//             console.log("f3" + a);
//         }
//         console.log("f2" + a);
//         a = 3;
//         f3();
//
//     }
//     console.log("f1" + a);
//     a = 2;
//     f2();
// }
//
// a = 1;
// f1();


// function log(x, y = "world"){
//     console.log(x , y);
// }
//
// log("hello");
// log("hello", "china");
// log("hello", "");



// let  x = 99;
// function foo(p = x + 1) {
//     console.log(p);
// }
//
// foo();
//
// x = 100;
// foo();



// function foo({x, y = 5}) {
//     console.log(x, y);
// }
// foo({});
// foo({x:1});
// foo({x:1, y:2});
// foo();


// function fetch(url,  {body="", method="GET", headers={}}) {
//     console.log(method);
// }
// fetch("http://example.com", {});
// fetch("http://example.com");

//
// function fetch(url,  {body="", method="GET"}={}) {
//     console.log(method);
// }
// fetch("http://example.com", {});
// fetch("http://example.com");



// let foo = "outer";
// function bar(func = x => foo) {
//     let foo = "inner";
//     console.log(func())
// }
//
// bar()


// function bar(func = () => foo) {
//     let  foo = "inner";
//     console.log(func())
// }
// bar()

//
// var x = 1;
// function foo(x, y =function () {x = 2;}) {
//     x =3;
//     y();
//     console.log(x);
// }
// foo();
// console.log(x);



// function throwIfMissing(){
//     throw new Error("Missing parameter");
// }
// function foo(mustBeProvided = throwIfMissing()) {
//     return mustBeProvided;
// }
// foo();



// function add(...values) {
//     let  sum = 0;
//
//     for(var val of values){
//         sum += val;
//     }
//     console.log(sum);
// }
// add(2, 5, 3);


// console.log(...[1,2,3])


// const doSomething = (function () {
//     "use strict"
//     return function (value = 42) {
//         return value;
//     };
// }())


// var f = function () {};
// console.log(f.name);
// console.log(f.name);


// var f = v => v;
// console.log(f(1));








// var sum = (num1=1 , num2=2)=>{ return num1 + num2};
//
// console.log(sum())



// const  isEven = n => n%2 == 0;
//
//
// const  f =function (n) {
//    return n % 2 ==0;
// }
// console.log(f(1));numbers(1,2,3,4);
// console.log(isEven(1));

// var  numbers = (...nums) => nums;
// numbers = function (...nums) {
//     return nums;
// }
// console.log(numbers(1,2,3,4))

// function foo() {
//     setTimeout(() => {
//         console.log('id:', this.id);
// }, 100);
// }
//
// var id = 21;
//
// function f() {
//     setTimeout(function () {
//         console.log(this.id);
//     }, 10)
// }
//
// foo.call({ id: 42 });



// function  foo() {
//     setTimeout(()=>{
//         console.log("args:", arguments);
//     }, 100)
// }
// foo(2,4,5,6)


// var  f = (function () {
//     return[
//         (() => this.x).bind({x : "inner"})()
//     ];
//
// }).call({x : "outer"});
//
// console.log(f);



// function insert(value) {
//     return{
//         into : function (array) {
//             return{
//                 after : function (afterValue) {
//                     array.splice(array.indexOf(afterValue) + 1, 0, value);
//                     return array;
//                 }
//             }
//         }
//     }
// }
// var t = insert(2).into([1,3]).after(1);
// console.log(t);



// let insert = (value) =>({into : (array) => ({after: (afterValue) =>{
//     array.splice(array.indexOf(afterValue) + 1, 0, value);
// }})});
// var t = insert(2).into([1,3]).after(1);
// console.log(t);





//
// const pipeline = (...funcs) =>
// val => funcs.reduce((a, b) => b(a), val);
//
// const plus1 = a => a + 1;
// const mult2 = a => a * 2;
// const addThenMult = pipeline(plus1, mult2);
//
// addThenMult(5)



// function factorial(n){
//     if(n === 1) return 1;
//     return n * factorial(n - 1);
// }
// console.log(factorial(5));

// function factorial(n, total) {
//     if(n === 1) return total;
//     return factorial(n-1, n * total);
// }
// console.log(factorial(5,1));



// var foo = "bar";
// var baz = {foo};
// console.log(baz);



//
// function f(x, y) {
//     return {x,y};
// }
// console.log(f(1,2))



// let s = Symbol();
// console.log(typeof s);


// var s1 = Symbol("foo");
// var s2 = Symbol("bar");
// console.log(s1);
// console.log(s2);
// console.log(s1.toString());
// console.log(s2.toString());


// log.levels = {
//     DEBUG:Symbol("debug"),
//     INFO:Symbol("info"),
//     WARN:Symbol("warn")
// };
// log(log.levels.DEBUG, "debug message");
// log(log.levels.INFO, "info message");


// function timeout(ms) {
//     return new Promise((resolve, reject) =>{
//             setTimeout(resolve, ms, "done");
//         });
// }
//
// timeout(100).then((value) =>{
//     console.log(value);
// });


//
// let promise = new  Promise(function (resolve, reject) {
//     console.log("Promise");
//     resolve();
// });
