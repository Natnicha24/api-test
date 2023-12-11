const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const PORT=4000

cloudinary.config({
    cloud_name: 'doyorigcq',
    api_key: '451532766918258',
    api_secret: '3IjooJAlCSOKwFIxB1SVz7vW8pE',
});

app.listen(PORT,()=>{
    console.log(`API listening on PORT${PORT}`)
})

app.get('/',(req,res)=>{
    res.send('this id my api running')
})

app.get('/about',(req,res)=>{
    res.send('this id my about routh')
})

module.exports=app;