const express = require('express');
const mongoose =require('mongoose')
const cors = require('cors')
const User= require('./model/User')

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/LogReg')
.then(()=>{
    console.log('DB connectetd')
})
.catch((err)=>{
    console.log(err)
})









app.listen(3000,()=>[
    console.log("server is running on 3000")
])