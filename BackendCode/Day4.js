// create one promise that will display user name and password 
// using resolve and if data will be rejected 
new Promise((resolve, reject) => {
    setTimeout(()=>{
        let err=true;
        if(!err){
            reosolve("user: CSE21, password:123");
        }else{
            reject("ERROR...:data fail");
        }
    },2000)
}).then((result) =>{
    console.log(result);
}).catch((error) => {
    console.log(error);
})