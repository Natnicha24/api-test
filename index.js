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

app.post('/saveimagegiver', upload.single('file'), async (req, res) => {
    console.log("I'm in the backend of saveimagegiver now");

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
                updateImggiver('giverdetail', req.body.giver_detail_id, file).then(() => {
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
const updateImggiver = async (tablename, giver_detail_id, fileimg) => {
    console.log("--------------------------");
    console.log("updateimg");
    console.log("id" + giver_detail_id);
    console.log("file" + fileimg);
    let sql = `UPDATE ${tablename} SET giver_picture='${fileimg}' WHERE giver_detail_id='${giver_detail_id}'`
    let result = await queryDB(sql);
    console.log("finish");
}

app.post('/updateimagegiver', upload.single('file'), async (req, res) => {
    console.log("I'm in the backend of updateimagegiver now");

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
                updateImggiveredit('giverdetail', req.body.giver_detail_id, file).then(() => {
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
const updateImggiveredit = async (tablename, giver_detail_id, fileimg) => {
    console.log("--------------------------");
    console.log("updateimg");
    console.log("id" + giver_detail_id);
    console.log("file" + fileimg);
    let sql = `UPDATE ${tablename} SET giver_picture='${fileimg}' WHERE giver_detail_id='${giver_detail_id}'`
    let result = await queryDB(sql);
    console.log("finish");
}

app.post("/registerMySql", async (req, res) => {
    console.log("im in backend of regis now")
    //อย่างที่1สถานะประชาชน ให้บันทึกลงในตารางuser พร้อมบันทึกเลข userid ในตาราง giver และบันทึกdetail ใน giver detail
    //อย่างที่2สถานะหน่วยงานให้ขึ้นแจ้งเตือนใส่เลขหน่วยงานและ
    // let sql = `CREATE TABLE IF NOT EXISTS user(user_id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255),password VARCHAR(20),phone VARCHAR(45),address VARCHAR(500),mail VARCHAR(45),citizen VARCHAR(45),agencies VARCHAR(45))`;
    // let result = await queryDB(sql);

    //ประชาชน
    let username = req.body.username;
    let phone = req.body.phone;
    let address = req.body.address;
    let mail = req.body.mail;
    let status = req.body.status;
    let password = req.body.password;
    let confirmpassword = req.body.confirmpassword;
    //เพิ่มตัวแปรเลขหน่วยงาน

    // let obj = Object.keys(result);

    console.log(status);
    if (status == "ประชาชน") {
        console.log("ประชาชน");
        sql = `INSERT INTO user(username,phone,address,mail,citizen,agencies,password) VALUES ("${req.body.username}","${req.body.phone}","${req.body.address}","${req.body.mail}","1","0","${req.body.password}")`;
        result = await queryDB(sql);
        console.log("ประชาชนลงทะเบียนสำเร็จ");
        res.send("0,");
    }
    else {
        console.log("หน่วยงาน and im send 1 to frontend");
        res.send("1," + username + "," + phone + "," + address + "," + mail + "," + password);
    }
})


app.post("/registerAgencies", async (req, res) => {
    console.log("im in backend of regisAgencies now")

    // let sql = `CREATE TABLE IF NOT EXISTS user(user_id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255),password VARCHAR(20),phone VARCHAR(45),address VARCHAR(500),mail VARCHAR(45),citizen VARCHAR(45),agencies VARCHAR(45))`;
    // let result = await queryDB(sql);

    let username = req.body.username;
    let phone = req.body.phone;
    let address = req.body.address;
    let mail = req.body.mail;
    let password = req.body.password;
    let agencies_number = req.body.agencies_number;
    let agenciescheck = "1";
    //เพิ่มตัวแปรเลขหน่วยงาน

    // let obj = Object.keys(result);

    console.log("หน่วยงาน");
    sql = `INSERT INTO user(username,phone,address,mail,citizen,agencies,password,agenciescheck) VALUES ("${username}","${phone}","${address}","${mail}","0","${agencies_number}","${password}","${agenciescheck}")`;
    result = await queryDB(sql);
    console.log("หน่วยงานลงทะเบียนสำเร็จ");
    res.send();

})


app.post("/loginMySql", async (req, res) => {
    console.log("Im im backend of login");
    let sql = "SELECT mail,password FROM user";
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    let checkmail = false;
    let checkpassword = false;

    let obj = Object.keys(result);
    for (var i = 0; i < obj.length; i++) {
        console.log(i);
        console.log(result[obj[i]].mail);

        if (result[obj[i]].mail == req.body.mail) {
            checkmail = true;
            console.log("HI: " + result[obj[i]].mail);
        }
        if (checkmail) {
            console.log("mail it true im going to check password");
            if (result[obj[i]].password == req.body.password) {
                checkpassword = true;
                console.log(result[obj[i]].password)
                break;
            }
            res.send("1," + "no");//password wrong
            console.log("i send 1 case password wrong.");
            break;
        }
    }
    if (checkmail == false) {
        console.log("im going to front with 0 case username wrong");
        res.send("0," + "no");
    }

    if (checkmail && checkpassword) {

        let sql = `SELECT user_id,username,citizen,agenciescheck FROM user WHERE mail='${req.body.mail}'`;
        let result = await queryDB(sql);
        result = Object.assign({}, result);
        for (var i = 0; i < obj.length; i++) {
            console.log(result[obj[i]]);
        }

        console.log("im going to front with 2 case all correct");
        console.log("2," + result[0].user_id + "," + result[0].username + "," + req.body.mail + "," + req.body.password + "," + result[0].citizen + "," + result[0].agenciescheck);
        res.send("2," + result[0].user_id + "," + result[0].username + "," + req.body.mail + "," + req.body.password + "," + result[0].citizen + "," + result[0].agenciescheck);
        console.log("LoginComplete");
    }
})

app.post("/ForgotPassword_addmail", async (req, res) => {
    console.log("Im im backend of ForgotPassword_addmail");
    let sql = "SELECT mail FROM user";
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    let mail_exist = false;
    let obj = Object.keys(result);

    for (var i = 0; i < obj.length; i++) {
        console.log(i);
        console.log(req.body.mail + "=" + result[obj[i]].mail);

        if (result[obj[i]].mail == req.body.mail) {
            mail_exist = true;
            console.log("I found " + result[obj[i]].mail);
            break;
        }
        else {
            console.log("try next");
        }
    }
    if (mail_exist == false) {
        console.log("Im not found your mail");
        console.log("I send 1");
        res.send("1");
    }
    if (mail_exist) {
        console.log("I send 0");
        res.send("0");
    }
})

app.post("/ForgotPassword_newpassword", async (req, res) => {
    console.log("Im im backend of ForgotPassword_newpassword");
    let sql = "SELECT mail,password FROM user";
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    // let mail_exist = false;
    let obj = Object.keys(result);

    if (req.body.password == req.body.confirmpassword) {
        for (var i = 0; i < obj.length; i++) {
            console.log(i);
            console.log(result[obj[i]].mail);

            if (result[obj[i]].mail == req.body.mail) {
                console.log("I found " + result[obj[i]].mail);
                console.log("I will change password for you");
                sql = `UPDATE user SET password = '${req.body.password}' WHERE mail='${req.body.mail}'`;

                result = await queryDB(sql);
                console.log("เปลี่ยนรหัสสำเร็จ");
                break;
            }
            else {
                console.log("try next");
            }
        }
        res.send();
    }
})

app.post("/getprofile", async (req, res) => {
    console.log("Im im backend of Getprofile now");
    let sql = `SELECT username,phone,address,mail,password FROM user WHERE user_id ="${req.body.id}"`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    res.send(result[0].username + "!" + result[0].phone + "!" + result[0].address + "!" + result[0].mail + "!" + result[0].password);

})

app.post("/getprofileadmin", async (req, res) => {
    console.log("Im im backend of Getprofileadmin now");
    let sql = `SELECT username,mail,password FROM user WHERE user_id ="${req.body.id}"`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    res.send(result[0].username + "!" + result[0].mail + "!" + result[0].password);

})

app.get("/showRecomended", async (req, res) => {
    console.log("im in backend of showRecomended");
    let sql = `SELECT project_id, projectname, projectdetail,project_image FROM project WHERE recomended = '1'`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    let obj = Object.keys(result);
    for (var i = 0; i < obj.length; i++) {
        console.log(result[obj[i]].project_id + result[obj[i]].projectname + result[obj[i]].projectdetail + result[obj[i]].project_image);
    }
    console.log("im going to front of list");
    res.json(result);

})

app.get("/showNews", async (req, res) => {
    console.log("im in backend of showNews");
    let sql = `SELECT idnews, name, detail,img FROM news`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    // let obj = Object.keys(result);
    // for (var i = 0; i < obj.length; i++) {
    //     console.log(result[obj[i]].project_id + result[obj[i]].projectname + result[obj[i]].projectdetail + result[obj[i]].project_image);
    // }
    console.log("im going to front of list");
    res.json(result);

})

app.post("/showNewsdetail", async (req, res) => {
    console.log("im in backend of showNewsdetail");
    let sql = `SELECT  name, detail,img FROM news WHERE idnews=${req.body.id}`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    // let obj = Object.keys(result);
    // for (var i = 0; i < obj.length; i++) {
    //     console.log(result[obj[i]].project_id + result[obj[i]].projectname + result[obj[i]].projectdetail + result[obj[i]].project_image);
    // }
    console.log("im going to front of list");
    res.send(result[0].name+","+result[0].detail+","+result[0].img);

})

app.post("/showolddata", async (req, res) => {
    console.log("im in backend of showoldData");
    let sql = `SELECT giver_name, giver_contact, donate,giver_picture,appointment,appointdate FROM giverdetail WHERE giver_detail_id = "${req.body.giver_detail_id}"`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    let obj = Object.keys(result);

    console.log(result[0].giver_name + result[0].giver_contact + result[0].donate + result[0].giver_picture + result[0].appointment + result[0].appointdate);

    console.log("im going to front of edit");
    res.send(result[0].giver_name + "!" + result[0].giver_contact + "!" + result[0].donate + "!" + result[0].giver_picture + "!" + result[0].appointment + "!" + result[0].appointdate);

})

app.get("/showallproject", async (req, res) => {
    console.log("im in backend of showAllproject");
    let sql = `SELECT project_id, projectname, projectdetail,project_image FROM project`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    let obj = Object.keys(result);
    for (var i = 0; i < obj.length; i++) {
        console.log(result[obj[i]].project_id + result[obj[i]].projectname + result[obj[i]].projectdetail + result[obj[i]].project_image);
    }
    console.log("im going to front of list");
    res.json(result);

})

app.post("/showprogress", async (req, res) => {
    console.log("im in backend of showProgress");
    var finish = "เสร็จสิ้น"
    let sql = `SELECT giver_detail_id, appointment, appointdate,approve,project_id,projectname,reason FROM giverdetail WHERE giver_id="${req.body.id}" AND approve !="${finish}" `;
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    let obj = Object.keys(result);

    for (var i = 0; i < obj.length; i++) {
        console.log(result[obj[i]].giver_detail_id + result[obj[i]].appointment + result[obj[i]].appointdate + result[obj[i]].approve + result[obj[i]].projectname + result[obj[i]].reason);
    }

    console.log("im going to front of progresspage");
    res.json(result);
})

app.post("/showagencies", async (req, res) => {
    console.log("im in backend of showAgencies");
    var finish = "เสร็จสิ้น"
    let sql = `SELECT user_id, username, agencies,agenciescheck FROM user WHERE agenciescheck ="${req.body.status}" `;
    let result = await queryDB(sql);
    result = Object.assign({}, result);

    let obj = Object.keys(result);

    // for (var i = 0; i < obj.length; i++) {
    //     console.log(result[obj[i]].giver_detail_id + result[obj[i]].appointment + result[obj[i]].appointdate + result[obj[i]].approve + result[obj[i]].projectname + result[obj[i]].reason);
    // }

    console.log("im going to front of mainadmin");
    res.json(result);
})

app.post("/showallagencies", async (req, res) => {
    console.log("im in backend of showallAgencies");
    console.log(req.body.status);
    if (req.body.status == "ทั้งหมด") {
        let sql = `SELECT user_id, username, agencies,agenciescheck,reason FROM user WHERE agenciescheck ="อนุมัติ" OR agenciescheck="0" `;
        let result = await queryDB(sql);
        result = Object.assign({}, result);

        let obj = Object.keys(result);
        res.json(result);

    }
    else if (req.body.status == "อนุมัติ" || req.body.status == "0") {
        sql = `SELECT user_id, username, agencies,agenciescheck,reason FROM user WHERE agenciescheck ="${req.body.status}" `;
        result = await queryDB(sql);
        result = Object.assign({}, result);

        obj = Object.keys(result);

        console.log(result);
        res.json(result);

    }


    // console.log("im going to front of history");
    // res.json(result);
})

app.post("/showHistory", async (req, res) => {
    console.log("im in backend of showHistory Project");
    console.log(req.body.userid);
    let sql = `SELECT history_id,giver_username, projectname,datefinish,appointment FROM history WHERE giver_id='${req.body.userid}'`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);
    res.json(result);
})

app.post("/showprofileagencies", async (req, res) => {
    console.log("im in backend of showprofileagencies Project");
    let sql = `SELECT username,phone,address,mail,agenciescheck,reason FROM user WHERE user_id='${req.body.id}'`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);
    console.log(result[0].username + "!" + result[0].phone + "!" + result[0].address + "!" + result[0].mail + "!" + result[0].agenciescheck + "!" + result[0].reason)
    res.send(req.body.id + "!" + result[0].username + "!" + result[0].phone + "!" + result[0].address + "!" + result[0].mail + "!" + result[0].agenciescheck + "!" + result[0].reason);
})

app.post("/showprofileadmin", async (req, res) => {
    console.log("im in backend of showprofileagencies Project");
    let sql = `SELECT username,mail FROM user WHERE user_id='${req.body.id}'`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);
    res.send(req.body.id + "!" + result[0].username + "!" + result[0].mail);
})

app.post("/showgiverdetail", async (req, res) => {
    console.log("im in backend of Giverdetail");

    let sql = `SELECT donate,giver_picture,appointment,appointdate FROM giverdetail WHERE giver_detail_id='${req.body.id}'`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);
    console.log(result[0].donate + "!" + result[0].giver_picture + "!" + result[0].appointment + "!" + result[0].appointdate);
    res.send(result[0].donate + "!" + result[0].giver_picture + "!" + result[0].appointment + "!" + result[0].appointdate);
})

app.post("/showallgiverdetail", async (req, res) => {
    console.log("im in backend of Giverdetail");

    let sql = `SELECT giver_name,giver_contact,donate,giver_picture,appointment,appointdate,reason FROM giverdetail WHERE giver_detail_id='${req.body.id}'`;
    let result = await queryDB(sql);
    result = Object.assign({}, result);
    console.log(result[0].giver_name + "!" + result[0].giver_contact + "!" + result[0].donate + "!" + result[0].giver_picture + "!" + result[0].appointment + "!" + result[0].appointdate + "!" + result[0].reason);
    res.send(result[0].giver_name + "!" + result[0].giver_contact + "!" + result[0].donate + "!" + result[0].giver_picture + "!" + result[0].appointment + "!" + result[0].appointdate + "!" + result[0].reason);
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