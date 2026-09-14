const app = express();
app.get('/',(req,res)=>{
    fstat.readFile('./pages/home.html','utf-8',(err,data)=>{
        if(err){
            res.status(500).send('Error reading file');
            return;
        }else{
            res.send(data);
        }
    });
});