/**
 * Created by barry on 2017/3/20.
 */

//Module体系、模块体系

//1、概述

//es5模块
//conmonJS模块就是对象,输入时必须查找对象属性
let {stat, exists, readFile} = require("fs");

//等同于。这种加载称为"运行时加载",只有在运行时才能得到这个对象,导致完全没有办法在编译时做"静态优化"
let _fs = require("fs");
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;


//es6模块。es6模块不是对象,而是通过export命令显式指定输出的代码,再通过import命令输入
import {stat, exists, readFile} from "fs"; //编译时加载,或者静态加载








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
function v1() {

}
function v2() {

}
export {
    v1 as streamv1,
    v2 as streamv2,
    v2 as streamLastestVersion
};



//4、import 命令
//5、模块的整体加载
//6、export default 命令
//7、export 与 import 的复合写法
//8、模块的继承
//9、跨模块常量
//10、import()
