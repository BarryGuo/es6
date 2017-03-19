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




//Generator函数的数据交换和错误处理
//通过next()方法的value返回值向函数外输出数据,通过接受参数,向函数体内输入数据
function *gen(x) {
    var y = yield x + 2;
    return y;
}
var g = gen(1);
g.next();   //value:3,done:false
g.next(2);  //value:2, done:true

//函数内部可以部署错误处理代码,捕获函数体外抛出的错误
function *gen(x) {
    try{
        var y = yield x + 2;
    }catch (e){
        console.log(e);
    }
    return y;
}
var g = gen(1);
g.next();    // value:3  done:false
g.throw("出错了");  //出错了





//使用generator函数封装异步任务
var fetch = require("node-fetch");
function *gen() {
    var url = "https://api.github.com/users/github";
    var result = yield  fetch(url);
    console.log(request.bio);
}

//执行上面代码的方法如下
var g = gen();
var result = g.next();
result.value.then(function (data) {
    return data.json();
}).then(function (data) {
    g.next(data);
});




//Thunk函数
//这是自动执行Generator函数的一种方法
//传值调用和传名调用

//参数的传名调用,往往需要将参数放到一个临时函数中,再将这个临时函数传入函数体。这个临时函数就叫做Thunk函数
function f(m) {
    return m + 2;
}
f(x + 5);

//等同于
var thunk = function () {
    return x + 5;
};
function f(thunk) {
    return thunk() * 2;
}


//JavaScript中的thunk函数
//js是传值调用,js中的thunk函数替换的不是表达式,而是多参数函数,将其替换成一个只接受回调函数作为参数的单参数函数
//正常版本的readFile(多参数版本)
fs.readFile(fileName, callback);
//thunk版本的readFile(单参数版本)
var Thunk = function (fileName) {
    return function (callback) {
        return fs.readFile(fileName, callback);
    };
};
var readFileThunk = Thunk(fileName);
readFileThunk(callback);



//任何函数,只要参数有回调函数,都可以写成Thunk函数的形式。下面是一个简单的Thunk函数转换器
//es5版本
var Thunk = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function (callback) {
            args.push(callback);
            return fn.apply(this, args);
        }
    };
};

//es6版本
var Thunk = function (fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        }
    };
};
//使用上面的转换器,生成fs.readFile的Thunk函数。
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);





//一些常用的模块  Thunkify模块(生产环境下,建议使用)



//Generator函数的流程管理
//Generator函数可以自动执行了
function *gen() {
    //
}
var g  = gen();
var res = g.next();
while (!res.done){
    console.log(res.value);
    res = g.next();
}
//上面的代码可以执行完所有步骤,但是不能保证前一步执行完,后一步才执行
//Thunk函数就能派上用场了
var fs = require("fs");
var thunkfiy = require("thunkify");
var readFileThunk = thunkfiy(fs.readFile);
var gen = function *() {
    var r1 = yield readFileThunk("/etc/fstab");
    console.log(r1.toString());
    var r2 = yield .readFileThunk("etc/shells");
    console.log(r2.toString());
};

//我们手动管理一下这个Generator函数
var g = gen();
var r1 = g.next();
r1.value(function (err, data) {
    if(err) throw(err);
    var r2 = g.next(data);
    r2.value(function (err, data) {
        if(err) throw err;
        g.next(data);
    });
});





//Thunk函数的自动流程管理。下面是一个基于Thunk函数的Generator执行器
function run(fn) {
    var gen = fn();
    function next(err, data) {
        var result  = gen.next(data);
        if(result.done) return;
        result.value(next);
    }
    next();
}
function  *g() {
    //...
}
run(9);

//不管有多少个异步操作,都可以直接将Generator函数传入run函数即可
var g = function *() {
    var f1 = yield readFile("fileA");
    var f2 = yield readFile("fileB");
    //...
    var fn = yield readFile("fileN");
};
run(g);




//co模块

