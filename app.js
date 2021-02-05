let express = require('express');
var MongoClient = require('mongodb').MongoClient;
let app = express();
let bodyParser = require('body-Parser')



require('./db');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', (req,res)=>{
    return res.send({
        error:false,
        message:"Welcome to REST API By Chanvit",
    })
})


app.use('/', require('./routes/auth'));
app.use('/', require('./routes/user'));
app.use('/', require('./routes/restroom'));


app.listen(3000,()=>{
    console.log("app runing ");
})

module.exports = app;