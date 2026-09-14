function add(num1, num2){
    console.log(num1+num2);
}
add(2,1);
// arrow funcitons
// variables in js: container to store data
// var, let, const
// syntax:()=>{}
const addition=()=>{
    console.log("Arrow Function");
}
addition();
const sum=(num1, num2)=>{
    return num1 + num2;
}
console.log(sum(4,5));
// argument : array like object
function addNum(){
    console.log(arguments);
}
addNum(2,1,3,4,5,6,7,8,9,10);