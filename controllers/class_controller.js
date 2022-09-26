const db = require('../db-config/db_config');

const classController = (req, res) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM class`, (err, result) => {
            if(err) return reject(err);
             resolve(result);
        })
    })
}

const addClass = (req, res) =>{
    return new Promise((resolve, reject) => {
        const {ownerid, name, description} = req.body;
        const sqlquery = `INSERT INTO class(ownerid, name, description) VALUES (?,?,?)`;
        db.query(
            sqlquery,
            [ownerid, name, description],
            (err, result) => {
                if(err) return reject(err);
                console.log(result)
                res.status(201).send({
                    "id": result.insertId
                });
        })
    })
}

const myClasses = (req, res) => {
    return new Promise((resolve, reject) => {
        const {userid} = req.query;
        // const sqlquery = `SELECT * FROM class where class.id = ( SELECT classid FROM students where studentid = ? )`;
        // const sqlquery = `SELECT classid FROM students where studentid = ?`;
        const sqlquery = `SELECT * FROM class INNER JOIN students ON class.id = students.classid where students.studentid = ?`
    
        db.query(
            sqlquery,
            [userid],
            (err, result) => {
                if(err) return reject(err);
                // res.send(result);
                resolve(result)
        })
    })
}


const addStudenttoClass = (req, res) => {
    return new Promise((resolve, reject) => {
        const {classid, studentid} = req.body
        const sqlquery = `INSERT INTO students VALUES (?,?)`;
        db.query(
            sqlquery,
            [classid, studentid],
            (err, result) => {
                if(err) return reject(err);
                res.send(result);
            }
        )
    })
}

const showClassesOwnedTutors = (req, res) => {
    return new Promise((resolve, reject) => {
        const {userid} = req.query;
        const sqlquery = `SELECT * FROM class where ownerid = ?`;
        db.query(
            sqlquery,
            [userid],
            (err, result)=> {
                if(err) return reject(err);
                res.send(result);
            }
        )
    })
}

const classStudentMap = (req, res) => {
    return new Promise((resolve, reject) => {
        const {classid} = req.query;
        const sqlquery = `SELECT * FROM users WHERE id IN (SELECT studentid FROM students WHERE classid = ?)`;
        db.query(
            sqlquery,
            [classid],
            (err, result) => {
                if(err) return reject(err);
                res.send(result);
            }
        )
    })
}

const studentsMapping = (req, res) => {
    return new Promise((resolve, reject) => {
        const sqlquery = `SELECT * FROM students`;
        db.query(
            sqlquery,
            (err, result) =>{
                if(err) return reject(err);
                res.send(result);
            }
        )
    })
}

module.exports = {
    classController,
    addClass,
    myClasses,
    addStudenttoClass,
    showClassesOwnedTutors,
    classStudentMap,
    studentsMapping
}