/**
 * Created by guoqingping on 2017/3/19.
 */

//async函数是什么?一句话,它就是Generator函数的语法糖

//依次读取两个文件
var fs = require("fs");
var readFile = function (fileName) {
    return new  Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if(error) reject(error);
            resolve(data);
        });
    });
};

//Generator方式调用
var gen = function *() {
    var f1 = yield readFile("/etc/fstab");
    var f2 = yield readFile("etc/shells");
    console.log(f1.toString());
    console.log(f2.toString());
}
//async方式调用,相对Generator调用,  *改成 async, yield改成await
var asyncReadFile = async function () {
    var f1 = await readFile("/etc/fstab");
    var f2 = await readFile("/etc/shells");
    console.log(f1.toString());
    console.log(f2.toString());
}




//async函数相对Generator函数的改进
//1、async自带执行器,而generator函数执行需要执行器,所以才有co模块
//2、更好的语义
//3、更广的适用性
//4、返回值是Promise




//用法
//async函数返回一个promise对像,可以使用then方法添加回调函数.一旦遇到await就会先返回,等到异步操作完成,再接着执行函数体内后面的代码
async function getStockPriceByName(name) {
    var symbol = await getStockSymbol(name);
    var stockPrice = await getStockPrice(symbol);
    return stockPrice;
}
getStockPriceByName("goog").then(function (result) {
    console.log(result);
});


//下面是另一个例子,指定多少毫秒后输出一个值
function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async  function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}
//执行到await时,需要等待50ms,等异步操作完成,才会继续往下走打印
asyncPrint("hello world", 50);



//async函数有多种使用形式
//函数声明
async function foo() { };
//函数表达式
const foo = async function () {}
//对象的方法
let obj = {async  foo(){}};
obj.foo().then(...);

//Class方法
class  Storage{
    constructor(){
        this.cachePromise = caches.open("avatars");
    }
    async getAvatar(name){
        const cache = await this.cachePromise;
        return cache.match("/avatars/${name}.jpg");
    }
}

const storage = new Storage();
storage.getAvatar("jake").then(...);

//箭头函数
const foo = async() => {};





//语法














