const express = require("express");
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.use(express.static(path.join(__dirname,'static')))
app.set('views','views');
app.set('view engine','ejs')


app.get('/',(req,res)=>{
    if(!req.session.count){
        req.session.count = 0;
    }
    req.session.count++;
    res.render('index',{count:req.session.count})
})

app.get('/reset',(req,res)=>{
    if (!req.session.count){
        res.redirect('/')
    }
    req.session.count = 0;
    res.redirect('/')
})

app.get('/addtwo',(req,res)=>{
    if (!req.session.count){
        res.redirect('/')
    }
    req.session.count += 1;
    res.redirect('/')
})


app.listen(8080,()=>{
    console.log('Listening at port 8080')
})