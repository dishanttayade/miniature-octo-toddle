const db = require('../db-config/db_config');
const bcrypt = require('bcrypt')
const SALT_Factor = 10
const jwt = require('jsonwebtoken');

const hashing =(password)=> bcrypt.genSalt(SALT_Factor, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash)=>{
        if(err) console.log(err);
        return hash;
    })
})

// const hashingCompare = (password) => bcrypt.genSalt


const userController = (req, res) => {
    // how promise works?
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users`, (err, result) =>{
            if(err) return reject(err);
            return resolve(result);
        })
    })  
}


const authUser = (req, res) => {
    return new Promise((resolve, reject) => {
        const {email, password}  = req.body;
        console.log(req.body)
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql,
                [email],
                async(err, result) => {
                    if(err) return reject(err);
                    if(result.length == 0){
                        console.log("User does not exist.")
                        res.sendStatus(404);
                    }else{
                        const hashedPassword = result[0].password;
                        console.log("Hashed Password Here : "+hashedPassword)
                        // if(password === hashedPassword){
                        //     res.send({
                        //         msg: "Logged In.",
                        //         result
                        //     })
                        // }
                        // else 
                        console.log(password)
                        if(await bcrypt.compare(password,hashedPassword)){
                            const token = jwt.sign({
                                email: result[0].email,
                                password: result[0].password
                            },
                                'DishantSecretkey', {
                                    expiresIn: '7D'
                                }
                            );
                            console.log("Login Successful.");
                            // res.send(`${result[0].name} logged in.`);
                            res.status(200).send({
                                msg: 'Logged In',
                                token,
                                result
                            })
                        }else{
                            console.log("Password Incorrect!");
                            res.send("Password Incorrect!")
                        }
                    }
                    console.log(result);
                    return resolve(result);
                }
            )
    })
}

const authUserWithToken = (req, res, next) => {
    return new Promise((resolve, reject)=>{
        const {email,password} = req.userData;
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql,
                [email],
                async(err, result) => {
                    if(err) return reject(err);
                    if(result.length == 0){
                        console.log("User does not exist.")
                        res.sendStatus(404);
                    }else{
                        const hashedPassword = result[0].password;
                        if(password === hashedPassword){
                            // next(req, res);
                            res.send({
                                msg: "Logged In.",
                                result
                            })
                        }
                    }
                }
            )
        
    })
}

const addNewUser = (req, res) => {
    return new Promise(async(resolve, reject) =>{
        const {name, email, password, type} = req.body;
        const hashedPassword =  await bcrypt.hash(password, SALT_Factor);
        // const logintime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const sqlSearch = `SELECT * FROM users WHERE email = ?`;
        const sqlInsert = `INSERT INTO users (name, email, password, type) VALUES(?,?,?,?)`;

        db.query(sqlSearch,
            [email],
            (err, result) => {
            if(err) return reject(err);

            if(result.length != 0){
                console.log("USER already exists.");
                res.sendStatus(409);
            }else{
                db.query(sqlInsert, 
                    [name,email,hashedPassword,type],
                    (err, result) => {
                        if(err) return reject(err);
                        // console.log(result.insertId);
                        res.status(201).json({
                            id: result.insertId
                        });
                })
            }
        })
    })
}


const updateUser = (req, res) => {
    return new Promise(async(resolve, reject) => {
        const updatedData = req.body;
        const {id} = req.body;
        const sql = `UPDATE users SET ? WHERE id = ?`;
        db.query(
            sql,
            [updatedData, id],
            (err, result) => {
                if(err) return reject(err);
                return resolve(result);
            }
        )
    })
}

const deleteUser = (req, res) => {
    return new Promise((resolve, reject) => {
        const {id} = req.body;
        const sqlquery = `DELETE FROM users WHERE id = ?`;
        db.query(
            sqlquery,
            [id],
            (err, result) => {
                if(err) return reject(err);
                return resolve(result);
            }
        )
    })
}


module.exports ={ 
    userController,
    addNewUser,
    authUserWithToken,
    updateUser,
    authUser,
    deleteUser
};