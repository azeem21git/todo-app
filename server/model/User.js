const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {

        name:{
            type:String,

        },

        city:{
            type:String,
        },

        study:{
            type:String
        },

        age:{
            type:Number
        },



    }
)

module.exports = mongoose.model('User',userSchema)