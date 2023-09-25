const express = require('express');
const mongoose = require('mongoose')
const router = require("./routes/user-routes");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(cookieParser());
app.use(express.json());
app.use('/',router);

mongoose.connect("mongodb+srv://ahkj:Y9Qj01QHl753QEPk@miniproject.kktnwsl.mongodb.net/BetterHelp?retryWrites=true&w=majority").then(()=>{
    app.listen(5000);
    console.log("Listening on PORT 5000");
    console.log("MongoDB Connected!!");
}).catch((err)=>
    console.log(err)
);