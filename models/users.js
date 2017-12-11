const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/database')

const UserSchema = mongoose.Schema({
  first_name:{
    type: String,
    lowercase: true,
    require: true
  },
  last_name:{
    type: String,
    lowercase: true,
    require: true
  },
  age:{
    type: Number,
    require: true,
    min: 18,
    max: 65
  },
  username:{
    type: String,
    require: true
  },
  email:{
    type: String,
    require: true
  },
  password:{
    type: String,
    require: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserById = (id, callback)=>{
  User.findById(id, callback)
}

module.exports.getUserByUsername = (username, callback)=>{
  let query = { username: username }
  User.findOne(query, callback)
}

module.exports.addUser = (newUser, callback) =>{
  bcrypt.genSalt(10 , (err, salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash)=>{
      if (err) throw err
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

module.exports.comparePassword = (candidatePassword , hash , callback)=>{
  bcrypt.compare(candidatePassword , hash , (err ,  isMatch)=>{
    if (err) throw err
    callback(null , isMatch)
  })
}
