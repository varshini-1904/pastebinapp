
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const mongoose = require('mongoose')

const dburl = process.env.MONGO_URL

const express = require('express');

const app = express();






async function main(){
    await mongoose.connect(dburl);
}

main()
.then(()=>{
    console.log("db is connected");
})
.catch((err)=>{
    console.log(err);
})


app.listen(3245,()=>{
    console.log("app is listening to port");
})

app.use(express.json());


app.use(require("./routes/health"));
app.use(require("./routes/pastes"));

module.exports = app;