const express = require('express');
const router = express.Router();
const {classController, addClass, myClasses, addStudenttoClass, showClassesOwnedTutors, classStudentMap, studentsMapping} = require('../controllers/class_controller');
const jwt = require('jsonwebtoken')
const {isAuthorized, isAuthorizedTutor} = require('./verify-auth')

const isLoggedIn = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            console.log("No Token");
            return res.send()
        }
        const decoded = jwt.verify(token, 'DishantSecretkey');
        console.log("DishantSecretkey")
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

router.get('/list-all-classes',isAuthorized, async(req, res) => {
    try{
        let result = await classController();
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})


router.post('/add-class',isAuthorizedTutor, async(req, res) => {
    try{
        let result = await addClass(req, res);
        res.json();
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/show-my-classes', isAuthorized, async(req, res) => {
    try{
        if(req.query.role==="student")
            await myClasses(req, res);
        if(req.query.role==="tutor" && isAuthorizedTutor)
            await showClassesOwnedTutors(req, res)
        res.json()
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})


router.post('/add-students-to-class', isAuthorized, async(req, res) =>{
    try{
        let result = await addStudenttoClass(req, res);
        res.json()
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/show-all-students-in-a-class', isAuthorizedTutor, async(req, res) => {
    try{
        let result = await classStudentMap(req, res);
        res.json()
    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
})

router.get('/studentsmapping', async(req, res) => {
    try{
        await studentsMapping(req, res);
        res.json()
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})


module.exports = router;
