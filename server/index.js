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



app.get('/api/user',async(req,res)=>{
    const allUsers = await User.find()
    res.json(allUsers)
    
})


app.delete('/api/user/:id',async(req,res)=>{
    const id = req.params.id
    const deleteUser = await User.findByIdAndDelete(id)
    res.json(deleteUser)


})

app.post('/api/user' ,async(req,res)=>{

    const userData=  req.body

    const newUser = new User(userData)

    const saveUser = await newUser.save()
    res.json(saveUser)


})





app.listen(3000,()=>[
    console.log("server is running on 3000")
])