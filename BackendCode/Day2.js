// Synchronous and asynchronous programming
// synchronous
// const hello=()=>{
//     settimeout(()=>{
//         console.log("Hello World");
//     }, 2000);
// }
// hello();
// console.log("this is asynchronous programming");
// callback, promises, async/await
function add(n1, n2, callback){
    console.log(n1+n2);
    callback();
}
let a=10;
let b=20;
add(a,b);
function sayHi(){
    console.log("this is callback function");
}
// create a function display(callback) that prints "Welcome to ABES "