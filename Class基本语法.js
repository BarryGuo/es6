/**
 * Created by barry on 2017/3/20.
 */

// 基本语法


//在es6以下的语法中,我们采用下面的方式定义新对象
// function Point(x, y) {
//     this.x = x;
//     this.y = y;
// }
// Point.prototype.toString = function () {
//     return "(" + this.x + "," + this.y + ")";
// };
// var p = new Point(1, 2);
// console.log(p.toString());

//如果使用class,我们可以这样定义对象
//定义类
// class Point{
//     constructor(x, y){
//         this.x = x;
//         this.y = y;
//     }
//     toString(){
//         return "(" + this.x + "," + this.y + ")";
//     }
// }
// var p = new Point(1, 2);
// console.log(p.toString());

