const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');
const PORT=4000

dotenv.config();

cloudinary.config({
    cloud_name: 'doyorigcq',
    api_key: '451532766918258',
    api_secret: '3IjooJAlCSOKwFIxB1SVz7vW8pE',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const path = require('path');

// ตั้งค่า CORS

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
  });

con.connect(err => {
    if (err) throw (err);
    else {
        console.log("MySQL connected");
    }
})


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