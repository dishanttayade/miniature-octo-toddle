const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')
dotenv.config();
const PORT = process.env.PORT || 5000;
require('./db-config/db_config');
const userRouter = require('./routes/users_routes');
const classRouter = require('./routes/class_router');
const feedRouter = require('./routes/feed_router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
app.use('/', userRouter);
app.use('/',classRouter);
app.use('/',feedRouter);

app.get('/', (req, res)=>{
    res.send("HI! Welcome to the server.")
})

app.listen(PORT, ()=>{
    console.log(`Backend running on http://localhost:${PORT}`)
})


// var corsOptions = {
//     origin: "http://localhost:8081"
//   };
  
//   app.use(cors(corsOptions));
  
//   // parse requests of content-type - application/json
//   app.use(express.json());
  
//   // parse requests of content-type - application/x-www-form-urlencoded
//   app.use(express.urlencoded({ extended: true }));
  