const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());
// Read HTML files from public folder
app.use(express.static("public"));

//Connection establishment with school database
const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "kavya-19",
    database: "school"
});

db.connect((err)=>{
    if(err)
        throw err;
    console.log("Connected to MySQL");
});

//TO GET DETAILS OF ALL STUDENTS
app.get("/students",(req,res)=>{

    db.query(
        "SELECT * FROM students",
        (err,result)=>{

            if(err) throw err;

            res.json(result);

        });

});
//TO GET THE DETAILS OF ONE STUDENT
app.get("/students/:sno",(req,res)=>{

    db.query(
        "SELECT * FROM students WHERE sno=?",
        [req.params.sno],
        (err,result)=>{

            if(err) throw err;

            res.json(result);

        });

});

//TO INSERT STUDENT DATA INTO students TABLE
app.post("/students",(req,res)=>{
        const {sno,name,total}=req.body;
    db.query(
        "INSERT INTO students(sno,name,total) VALUES(?,?,?)",
        [sno,name,total],
        (err)=>{
            if(err)
            {   res.status(500).send(err.message);
                return;
            }
            res.send("Student Inserted");
        });

});

//TO UPDATE STUDENT DETAILS
app.put("/students/:sno",(req,res)=>{

    const {name,total}=req.body;

    db.query(
        "UPDATE students SET name=?, total=? WHERE sno=?",
        [name,total,req.params.sno],
        (err,result)=>{

            if(err)
            {
                res.status(500).send(err.message);
                return;
            }

            if(result.affectedRows==0)
                res.status(404).send("Student NOT found");
            else
                res.send("Student Updated");

        });

});

//TO DELETE STUDENT DETAILS
app.delete("/students/:sno",(req,res)=>{

    db.query(
        "DELETE FROM students WHERE sno=?",
        [req.params.sno],
        (err,result)=>{
            if(err)
            {
                res.status(500).send(err.message);
                return;
            }

            if(result.affectedRows==0)
                res.status(404).send("Student NOT found to delete");
            else
                res.send("Student Deleted");

        });

});

//Server to listen of port number 3000
app.listen(1000,()=>{

    console.log("Server running at http://localhost:1000");

});