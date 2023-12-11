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

    ssl: {
        rejectUnauthorized: false, // ในบางกรณี, คุณอาจจะต้องตั้งค่าเป็น true หรือตั้งค่า SSL certificate
      },
  });

con.connect(err => {
    if (err) throw (err);
    else {
        console.log("MySQL connected");
    }
})

let tablename = "user";

const queryDB = (sql) => {
    return new Promise((resolve, reject) => {
        // query method
        con.query(sql, (err, result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}

const storage = multer.memoryStorage(); // ใช้ memory storage แทน disk storage

const upload = multer({ storage: storage });

app.post('/saveimageproject', upload.single('file'), async (req, res) => {
    console.log("I'm in the backend of saveimageproject now");

    const imageBuffer = req.file.buffer; // ดึงข้อมูลไฟล์จาก buffer
    try {
        const result = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ' });
            } else {
                console.log('Image uploaded successfully:', result.secure_url);
                const file = result.secure_url;
                // ทำสิ่งที่คุณต้องการกับ URL ของไฟล์ที่อัพโหลด
                updateImg('project', req.body.project_id, file).then(() => {
                    console.log("HI");
                    res.send("file:" + file);
                });
            }
        }).end(imageBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ' });
    }
});
const updateImg = async (tablename, project_id, fileimg) => {
    console.log("--------------------------");
    console.log("updateimg");
    console.log("id" + project_id);
    console.log("file" + fileimg);
    let sql = `UPDATE ${tablename} SET project_image='${fileimg}' WHERE project_id='${project_id}'`
    let result = await queryDB(sql);
    console.log("finish");
}


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