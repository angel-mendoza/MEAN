const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config/database')
const User = require('../models/users')

router.post('/sign-in', (req, res, next)=>{
 let newUser = new User({
   first_name: req.body.first_name,
   last_name: req.body.last_name,
   age: req.body.age,
   username: req.body.username,
   email: req.body.email,
   password: req.body.password
 })
  User.addUser(newUser, (err,user)=>{
    if (err) {
      res.json({success: false , msj: 'Error al crear el usuario'})
    }else{
      res.json({success: true , msj: 'Usuario creado correctamente'})
    }
  })
})

router.post('/sign-up', (req, res, next)=>{
  const username = req.body.username
  const password = req.body.password

  User.getUserByUsername(username , (err, user)=>{
    if (err) throw err
    if (!user) {
      res.json({success: false , msj: 'Usuario no Encontrado'})
    }

    User.comparePassword(password , user.password , (err , isMatch)=>{
      if (err) throw err
      if (isMatch) {
        const token = jwt.sign({data: user}, config.secret , {
            expiresIn: 60
        })
      res.json({
        success: true,
        token: 'JWT ' +token,
        user:{
          id: user._id,
          name: user.first_name + ' ' + user.last_name,
          username: user.username,
          email: user.email,
          age: user.age
        }
      })
    }else{
      res.json({success: false , msj: 'Contrasena invalida'})
    }
    })
  })
})


router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});


module.exports = router
