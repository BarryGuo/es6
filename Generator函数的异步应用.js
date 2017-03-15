/**
 * Created by guoqingping on 2017/3/15.
 */

//es6之前,异步编程的方法,大概有下面4种
// 回调函数   事件监听    发布/订阅   Promise对象
//generator函数将JavaScript异步编程带入了一个全新的阶段



function *asyncJob() {
    //其他代码
    var f = yield readFile(fileA);
    //其他代码
}
