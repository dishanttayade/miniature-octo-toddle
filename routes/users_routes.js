const express = require('express');
const router = express.Router();
const {userController, addNewUser, authUser, authUserWithToken,updateUser, deleteUser} = require('../controllers/user_controllers');
const db = require('../db-config/db_config');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { isAuthorizedTutor } = require('./verify-auth');


const isLoggedIn = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            console.log("No Token");
            return res.send()
        }
        const decoded = jwt.verify(token, 'DishantSecretkey');
        console.log(decoded);
        req.userData = decoded
        next();
    }catch(e){
        console.log(e);
        return res.status(401).send({
            msg: "Your session is not valid"
        })
    }
}

router.get('/all-users', async(req, res, next) =>{
    try{
        let result = await userController();
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
})

router.post('/login-user', async(req, res, next) =>{
    try{
        console.log(req.body)
        let result = await authUser(req, res);
        res.json()
        // res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/login-with-token',  isLoggedIn, async(req, res, next) =>{
    try{
        console.log(req.body)
        let result = await authUserWithToken(req, res, ()=>{});
        res.json()
        // res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/add-new-user',isAuthorizedTutor, async(req, res, next) =>{
    try{
        let result = await addNewUser(req, res);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})


router.put('/update-student-info',isAuthorizedTutor,  async(req, res) => {
    try{
        let result = await updateUser(req, res);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.delete('/delete-user', isAuthorizedTutor, async(req, res) => {
    try{
        let result = await deleteUser(req, res);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

module.exports = router;

// router.post('/login', async(req, res, next) => {
//     // console.log(req.body);
//     const {email} = req.body;
//     db.query(`SELECT * FROM USERS WHERE email = ?`, [[email]],
//         (err, result) => {
//             if(err){
//                 throw err;
//                 return res.status(400).send({
//                     msg: err
//                 });
//             }
//             if(!result.length){
//                 return res.status(401).send({
//                     msg: "Username or password is incorrect!"
//                 });
//             }
//             bcrypt.compare(
//                 req.body.password,
//                 result[0]['password'],
//                 (bErr, bResult) => {
//                     if(bErr){
//                         throw bErr;
//                         return res.status(401).send({
//                             msg: 'Username or password is incorrect!'
//                         })
//                     }
//                     if(bResult){
//                         const token = jwt.sign({
//                             email : result[0].email,
//                             id: result[0].id
//                         },
//                         'SECRETKEY',{
//                             expiresIn:'7D'
//                         }
//                         );
//                         console.log(token);
//                         db.query(`UPDATE USERS SET last_login = now() WHERE id = ${result[0].id}`);
//                         return res.status(200).send({
//                             msg: 'Logged In!',
//                             token, 
//                             user: result[0]
//                         });
//                     }
//                     return res.status(401).send({
//                         msg: 'Username or password is incorrect'
//                     })
//                 }
//             )
//         }
//     )
// })

