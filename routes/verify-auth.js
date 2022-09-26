const jwt = require('jsonwebtoken')
const {authUserWithToken} = require('../controllers/user_controllers');
const db = require('../db-config/db_config')

const isAuthorized = async(req, res, next ) => {
    try{
        const authtoken = req.headers.authorization;
        if(!authtoken){
            console.log("No Token");
            return res.send()
        }
        const token = authtoken.split(' ')[1];
        const decoded = jwt.verify(token, 'DishantSecretkey');
        console.log("DishantSecretkey")
        console.log(decoded);
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(
            sql,
            [decoded.email],
            async(err, result)=>{
                if(err) console.log(err);
                if(result.length==0){
                    console.log("User does not exist.");
                }else{
                    const hashedPassword = result[0].password;
                    if(hashedPassword === decoded.password){
                        req.userData = result[0];
                            next()
                    }
                }
            }
        )

    }catch(e){
        console.log(e);
        return res.status(401).send({
            msg: "Your token is not valid"
        })
    }
}

const isAuthorizedTutor = async(req, res, next ) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            console.log("No Token");
            return res.send()
        }
        const decoded = jwt.verify(token, 'DishantSecretkey');
        console.log("DishantSecretkey")
        console.log(decoded);
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(
            sql,
            [decoded.email],
            async(err, result)=>{
                if(err) console.log(err);
                if(result.length==0){
                    console.log("User does not exist.");
                }else{
                    const hashedPassword = result[0].password;
                    if(hashedPassword === decoded.password){
                        if(result[0].type === "tutor" ){
                                // && result[0].id == req.body.ownerid
                                req.userData = result[0]
                            next()
                        }else{
                            res.send({
                                msg: "Not verified user"
                            })
                        }
                    }
                }
            }
        )

    }catch(e){
        console.log(e);
        return res.status(401).send({
            msg: "Your token is not valid"
        })
    }
}

module.exports = {
    isAuthorized,
    isAuthorizedTutor
};
