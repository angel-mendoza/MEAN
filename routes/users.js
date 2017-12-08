const express = require('express')
const router = express.Router()

router.get('/sign-in', (req, res, next)=>{
  res.send('sign in')
})

router.get('/sign-up', (req, res, next)=>{
  res.send('sign up')
})

router.get('/profile', (req, res, next)=>{
  res.send('profile')
})

router.get('/validate', (req, res, next)=>{
  res.send('validate')
})

module.exports = router
