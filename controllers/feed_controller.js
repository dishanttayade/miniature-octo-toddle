const db = require('../db-config/db_config');

const feedController = (req, res) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM filelist`,(err, result) =>{
            if(err) return reject(err);
            return resolve(result)
        })
    })
}

const feedByClass = (req, res) => {
    return new Promise((resolve, reject) =>{
        // console.log(req)
        const {classid} = req.query;
        const sqlquery = `SELECT * FROM filelist where classid = ?`
        db.query(
            sqlquery,
            [classid],
            (err,result) => {
                if(err) return reject(err);
                return resolve(result);
            }
        )
    })
}


const feedUpload = (req, res) => {
    return new Promise((resolve, reject) => {
        const {classid, filename, link, type,uploadedbyid, description} = req.body;
        const {id} = req.userData;
        const sqlquery = `INSERT INTO filelist(classid, filename, link, type, uploadedtime, uploadedbyid, description) VALUES (?,?,?,?,now(),?,?)`;
        db.query(
            sqlquery,
            [classid,filename,link,type,id,uploadedbyid,description],
            (err, result) => {
                if(err) return reject(err);
                return resolve(result);
            }
        ) 
    })
}

const fileRename = (req, res) => {
    return new Promise((resolve, reject) => {
        const {classid, id, newfilename} = req.body;
        const sqlquery = `UPDATE filelist SET filename = ? WHERE id = ? and classid = ?`;
        db.query(
            sqlquery,
            [newfilename,id, classid ],
            (err, result) => {
                if(err) return reject(err);
                console.log(result)
                return resolve(result);
            }
        )
    })
}

const deleteFile = (req, res) => {
    return new Promise((resolve, reject) => {
        const {id} = req.body;
        const sqlquery = `DELETE FROM filelist WHERE id = ?`;
        db.query(
            sqlquery,
            [id],
            (err, result) => {
                if(err) return reject(err);
                if(!result) console.log("NotFound")
                return resolve(result);
            }
        )
    })
}

const searchWithFileType = (req, res) => {
    return new Promise((resolve, reject) => {
        const {filetype} = req.query;
        const {type} =  req.userData;
        
        let sqlquery = 'SELECT * FROM filelist WHERE type = ?';
        // let data = filetype

        if(type === "tutor"){
            sqlquery = `SELECT * FROM filelist WHERE type = ? and uploadedbyid = ?`
            db.query(
                sqlquery,
                [filetype, req.userData.id],
                (err, result) => {
                    if(err) return reject(err);
                    return resolve(result);
                }
            )
        }
        else{
            sqlquery = 'SELECT * FROM filelist WHERE type = ? and classid in (SELECT classid from students where studentid = ?)'
            db.query(
                sqlquery,
                [filetype, req.userData.id],
                (err, result) => {
                    if(err) return reject(err);
                    return resolve(result);
                }
            )
        }
    })
}


const searchWithFileName = (req, res) => {
    return new Promise((resolve, reject) => {
        const {filename} = req.query;
        const {type} =  req.userData;
        
        let sqlquery = 'SELECT * FROM filelist WHERE filename = ?';
        // let data = filetype

        if(type === "tutor"){
            sqlquery = `SELECT * FROM filelist WHERE filename LIKE ? and uploadedbyid = ?`
            db.query(
                sqlquery,
                [filename+'%', req.userData.id],
                (err, result) => {
                    if(err) return reject(err);
                    return resolve(result);
                }
            )
        }
        else{
            sqlquery = 'SELECT * FROM filelist WHERE filename LIKE ? and classid in (SELECT classid from students where studentid = ?)'
            db.query(
                sqlquery,
                [filename+'%', req.userData.id],
                (err, result) => {
                    if(err) return reject(err);
                    return resolve(result);
                }
            )
        }
    })
}

module.exports = {
    feedController,
    feedByClass,
    feedUpload,
    fileRename,
    deleteFile,
    searchWithFileType,
    searchWithFileName
}