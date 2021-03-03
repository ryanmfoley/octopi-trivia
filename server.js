// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')




// Configuration
const dotenv = require("dotenv");
dotenv.config();
const app = express()
const db = mongoose.connection
const PORT = process.env.PORT || 3000
const mongodbURI = process.env.MONGODBURI

// Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

app.use(express.urlencoded({
    extended: true
}))

// Database
mongoose.connect(
  mongodbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established at', mongodbURI)
  }
)

// Mongo statuses
db.on('error', (err) => {
    console.log(err.message + ' is mongod not running?');
})
db.on('disconnected', () => {
    console.log('mongo disconnected');
})

// Controllers
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)


// Routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

// Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
