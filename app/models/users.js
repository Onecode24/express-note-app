let mongoose = require('mongoose')
let bcrypt = require('bcrypt')
require('dotenv').config()

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        default: '',
        unique: true
    },
    email: {
        type: String,
        require: true,
        default: '',
        unique: true
    },
    password: {
        type: String,
        require: true,
        default: ''
    },
    createAt:{
        type: Date,
        default: Date.now(),
    }
})

// Add Methods to models

userSchema.method = {

    //Check if password is correct
    authenticatePassword: function(pass){
        return bcrypt.compare(pass,this.password)
    },

    // encrypt password
    encryptPassword: function(pass){
        if(!pass) return ''
        else return bcrypt.hashSync(pass,process.env.SALT_OR_ROUNDS)
    }

    

}    



module.exports = mongoose.model('User',userSchema)