/**
 * Created by guoqingping on 2017/3/13.
 */


// 模拟next返回值的例子
var it = makeIterator(["a","b"]);
it.next();
it.next();
it.next();
function makeIterator(array) {
    var nextIndex = 0;
    return{
        next: function () {
            return nextIndex < array.length?
            {value: array[nextIndex++], done: false}:
            {value:undefined, done: true};
        }
    }
}