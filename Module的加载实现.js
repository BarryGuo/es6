/**
 * Created by barry on 2017/3/20.
 */

//1、浏览器加载

//传统方法,通过<script>标签加载JavaScript脚本。
//加载方式有同步加载和异步加载

//同步加载
//加载页面内嵌的脚本
// <script type = "application/javascript">
//         //module code
// </script>
//加载外部脚本
// <script type = "application/javascript" src="path/to/myModule.js">
// </script>

//异步加载。改善用户体验
//渲染完再执行,顺序加载
// <script src = "path/to/myModule.js" defer></script>
//下载完就执行,不保证顺序加载
// <script src = "path/to/myModule.js" async></script>


//ES6模块,也使用<script>标签,但是要加入type="module"属性
// <script type="module" src="foo.js"></script>  //相当于传统方法的defer加载方式
//也可以打开async属性。








//2、ES6 模块与 CommonJS 模块的差异
//它们有两个重大差异:
//CommonJS值输出的是一个值得拷贝,ES6模块输出的是值得引用
//CommonJS模块是运行时加载,ES6模块是编译时输出接口








//3、Node 加载








//4、循环加载







//5、ES6模块的转码
