/**
 * Created by barry on 2017/3/20.
 */

//Module体系、模块体系

//1、概述

//es5模块
//conmonJS模块就是对象,输入时必须查找对象属性
// let {stat, exists, readFile} = require("fs");
//
// //等同于。这种加载称为"运行时加载",只有在运行时才能得到这个对象,导致完全没有办法在编译时做"静态优化"
// let _fs = require("fs");
// let stat = _fs.stat;
// let exists = _fs.exists;
// let readfile = _fs.readfile;


//es6模块。es6模块不是对象,而是通过export命令显式指定输出的代码,再通过import命令输入
// import {stat, exists, readFile} from "fs"; //编译时加载,或者静态加载








//2、严格模式
//es6模块自动采用严格模式,不管有没有在模块头部加上"use strict"










//3、export 命令
//一个模块就是一个独立的文件,export命令的作用在于将一个模块的内容展示输出给另一个模块,也就是规定模块的对外接口

//profile.js文件,使用export对外输出3个变量
// export var firstName = "Michael";
// export var lastName = "Jackson";
// export var year = 1958;

//另一种写法,同样输出3个变量
//  var firstName = "Michael";
//  var lastName = "Jackson";
//  var year = 1958;
//  export {firstName, lastName, year}; //优先使用这种写法

//export命令除了输出变量,还可以输出函数或者类(class)
// export function multiply(x, y) {
//     return x * y;
// };

//可以使用as关键字对输出的变量进行重命名
// function v1() {
//
// }
// function v2() {
//
// }
// export {
//     v1 as streamv1,
//     v2 as streamv2,
//     v2 as streamLastestVersion
// };

//需要特别注意,export命令规定的是对外的接口,必须与模块内部的变量建立一对一的关系
// export 1;  //报错

//报错
// var m =1;
// export  m;

//正确的写法是这样的
//写法1
// export var m =1;

//写法2
// var m =1;
// export  {m};

//写法3
// var n = 1;
// export {n as m};


//同样的,function和class的输出,也必须遵守这样的写法
//报错
// function f() {}
// export f;

//正确
// export function f() {}
//正确
// function f() {}
// export {f};

//export语句输出的接口,与其对应的值是动态绑定关系,即通过该接口,可以取到模块内部实时的值
// export var foo = "bar";
// setTimeout(() => foo = "baz", 500); //500ms后变成baz








//4、import 命令
//使用export命令定义了模块的对外接口后,其他js文件就可以通过import命令加载这个模块
//main.js
// import {firstName, lastName, year} from "./profile";
// function setName(element) {
//     element.textContent = firstName + "" +lastName;
// }

//如果想为输入的变量重新取一个名字,import命令要使用as关键字
// import {lastName as surname} from "./profile";

//import命令具有提升效果,会提升到真个模块的头部,首先执行
// foo();
// import {foo} from  "my_module";

//由于import是静态执行,所以不能使用表达式和变量,这些只能在运行时才能得到结果的语法结构
//报错
// import {"f" + "oo"} from "my_module";
//报错
// let module = "my_module";
// import {foo} from  module;
//报错
// if(x === 1){
//     import {foo} from "module";
// }else {
//     import {foo} from "module2";
// }






//5、模块的整体加载
//除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

//circle.js文件
// export function area(radius) {
//     return Math.PI * radius * radius;
// }
// export function circumference(radius) {
//     return 2 * Math.PI * radius;
}
//加载这个模块,main.js
// import {area, circumference} from "./circle";
// console.log("圆面积:" + area(4));
// console.log("圆周长:" + circumference(4));


//上面写法是逐一指定要加载的方法,整体加载的写法如下
// import * as circle from "./circle";
// console.log("圆面积:" + circle.area(4));
// console.log("圆周长:" + circle.circumference(14));






//6、export default 命令
//export default命令，为模块指定默认输出。

// //export-default.js
// export default function () {
//     console.log("foo");
// }
// //import-default.js
// import customName from './export-default';
// customName();
//



//export default命令用在非匿名函数前,也是可以的
//export-default.js
// export default function  foo() {
//     console.log("foo");
// }
// //或者写成
// function foo() {
//     console.log("foo");
// }
// export default foo;


//下面比较一下默认输出和正常输出
// 第一组
// export default function crc32() { // 输出
//                                   // ...
// }
//
// import crc32 from 'crc32'; // 输入
//
// // 第二组
// export function crc32() { // 输出
//                           // ...
// };
//
// import {crc32} from 'crc32'; // 输入



//









//7、export 与 import 的复合写法

//export与import的复合写法。先输入{foo,bar},再输出{foo,bar}
// export {foo, bar} from "my_module";

//等同于
// import {foo, bar } from "my_module";
// export {foo, bar};

//接口改名
// export {foo as myFoo} from "my_module";

//整体输出
// export * from "my_module";

//默认接口的写法如下
// export {default} from "foo";

//具名接口改成默认接口的写法如下
// export {es6 as default} from "./someModule";
//等同于
// import {es6} from "./someModule";
// export default es6;

//默认接口改成 具名接口
// export {default as es6} from "./someModule";







//8、模块的继承
//模块之间也可以继承。
//假设有一个circleplus模块,继承了circle模块
// export * from "circle";   //输出circle模块的所有属性和方法。export * 会忽略circle模块的default方法
// export  var  e = 2.7789;  //输出自定义的e变量和默认方法
// export default function (x) {
//     return Math.exp(x);
// }


//只输出circle的属性和方法,改名后输出
// export {area as circleArea} from "circle";


//加载上面的模块的写法
// import * as math from "circleplus";












//9、跨模块常量

//const命令声明的常量只在当前代码块有效。如果想设置跨模块的常量(跨多个文件),或者说一个值要被多个模块共享,可以采用下面的写法
// // constants.js 模块
// export const A = 1;
// export const B = 3;
// export const C = 4;
//
// // test1.js 模块
// import * as constants from './constants';
// console.log(constants.A); // 1
// console.log(constants.B); // 3
//
// // test2.js 模块
// import {A, B} from './constants';
// console.log(A); // 1
// console.log(B); // 3


//如果要使用的常量非常多，可以建一个专门的constants目录，将各种常量写在不同的文件里面，保存在该目录下。

// // constants/db.js
// export const db = {
//     url: 'http://my.couchdbserver.local:5984',
//     admin_username: 'admin',
//     admin_password: 'admin password'
// };
//
// // constants/user.js
// export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
// //然后，将这些文件输出的常量，合并在index.js里面。
//
// // constants/index.js
// export {db} from './db';
// export {users} from './users';
// //使用的时候，直接加载index.js就可以了。
//
// // script.js
// import {db, users} from './constants';







//10、import()
//import适用于静态加载,import()适用于动态加载
