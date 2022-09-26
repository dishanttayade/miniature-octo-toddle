const express = require('express');
const router = express.Router();
const {feedController, feedByClass, feedUpload, fileRename, deleteFile, searchWithFileType, searchWithFileName}  = require('../controllers/feed_controller');
const AWS = require('aws-sdk');
require('dotenv').config();
const upload = require('express-fileupload');
const {isAuthorizedTutor, isAuthorized} = require('../routes/verify-auth');

router.use(upload());

const s3 = new AWS.S3({
    accessKeyId: 'AKIAQ42ODMKWZAEUV5WS',
    secretAccessKey: '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'
})

const uploadToBucket = async(file, locate) => {
    const filename = file.name;
    const mimetype = file.mimetype;
    const params = {
        Bucket : 'dishantsawsbucket',
        Key :  locate + filename,
        Body : file.data,
        ContentType: mimetype
    }
    let s3url =  await s3.upload(params).promise()
                    .then((data) => {
                        return data.Location
                    })
                    .catch((err) => console.log(err));

    console.log(s3url);
    // async(s3err, data)=>{
    //     if(s3err) console.log(s3err);
    //     // console.log(data.Location)
    //     s3url  = await data.Location;
    //     console.log(s3url)
    // })

    // const s3url = s3.getSignedUrl('getObject',{Key: params.Key, Bucket: params.Bucket});
    return s3url; 
}

router.post('/add-a-feed',isAuthorizedTutor, async(req, res) => {
    // console.log(req)
    try{
        if(req.body.url){
            req.body.link = req.body.url
            if(!req.body.filename)
                req.body.filename = "No Name"
        }
        if(req.files){
            let file = req.files.files;
            const link = await uploadToBucket(file,'')
            req.body.link = link
            req.body.filename = file.name
        }
        setTimeout(async()=>{
            let result = await feedUpload(req, res);
            res.json(result);
        }, 800)
        // res.json({"link" : req.body.link});
    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
})

//for admin
router.get('/all-feed-in-one',isAuthorizedTutor,  async(req, res) => {
    try{
        let result = await feedController(req, res);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

//for students
router.get('/feed-by-class',isAuthorized, async(req, res) =>{

    try{
        let result = await feedByClass(req, res);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
})


router.put('/rename-file', isAuthorizedTutor, async(req, res) => {
    try {
        let result = await fileRename(req, res);
        res.json(result);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


router.delete('/delete-feed', async(req, res) =>{
    try{
        let result = await deleteFile(req, res);
        // console.log()
        res.json(result);
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})


router.get('/search-file-by-type',isAuthorized ,async(req, res) => {
    try{
        let result = await searchWithFileType(req, res);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
})

router.get('/search-file-by-name', isAuthorized, async(req, res) => {
    try{
        let result = await searchWithFileName(req, res);
        res.json(result);
    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
})


module.exports = router