const express = require('express')
const path = require('path')
const bodyParser  = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')

//conexion a mongodb
mongoose.connect(config.database, {
  useMongoClient: true
})

mongoose.connection.on('connected', ()=>{
  console.log('base de datos conectada' + config.database)
})

mongoose.connection.on('error', (err)=>{
  console.log('error de base de datos: ' + err)
})

const app = express()
const port = 3000


const users = require('./routes/users')

//middleware que se usaran
app.use(cors())
app.use(bodyParser.json())
app.use('/users', users)
app.use(passport.initialize())
app.use(passport.session())


require('./config/passport')(passport)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req , res)=>{
  res.send('punto de entrada invalido')
})

app.listen(port, ()=>{
  console.log('servidor corriendo en el puerto ' + port)
})
