/**
 * Created by guoqingping on 2017/3/15.
 */

//es6之前,异步编程的方法,大概有下面4种
// 回调函数   事件监听    发布/订阅   Promise对象
//generator函数将JavaScript异步编程带入了一个全新的阶段

//Generator函数非常适合用来完成异步操作

//下面举一个读取文件的例子,有下面几种写法


//回调函数 写法
fs.readFile("etc/passwd","utf-8",function (err,data) {
    if(err){
        throw err;
    };
    console.log(data);
});

//回调函数本身没有什么问题,但是如果多次读取文件,就会出现多重嵌套。这种情况称为"回调函数地狱(callback hell)"
fs.readFile(fileA, "utf-8", function (err, data) {
   fs.readFile(fileB, "utf-8", function (err, data) {
       //....
   }) ;
});


//为了解决回调函数地狱,Promise对象出生了。Promise对象可以将回调函数的嵌套调用改成链式调用
var readFile = require("fs-readfile-promise");
readFile(fileA)
    .then(function (data) {
        console.log(data.toString());
    })
    .then(function () {
        return readFile(fileB);
    })
    .then(function (data) {
        console.log(data.toString());
    })
    .catch(function (err) {
        console.log(err);
    });
//Promise提供then方法加载回调函数,catch方法捕获执行过程中抛出的错误。除此之外,并无新意





//Generator函数
//有一种异步编程的解决方案称为协程,读取文件的协程写法类似如下
function *asyncJob() {
    //其他代码
    var f = yield readFile(fileA);
    //其他代码
}
//上面的函数asyncJob()是一个协程。执行到yield时,执行权交给其他协程。也就是说,yield是异步两个阶段的分界线。
//协程执行到yield命令就暂停,等到执行权返回,再从暂停的地方继续往后执行。











// 协程的Generator函数实现
//Generator函数是协程在es6的实现,最大的特点就是可以交出函数的执行权,即暂停执行
function *gen(x) {
    var y = yield x + 2;
    return y;
}
var g = gen(1);
g.next();
g.next();