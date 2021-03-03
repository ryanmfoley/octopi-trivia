// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')




// Configuration
const dotenv = require("dotenv");
dotenv.config();
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const session = require('express-session')
const bodyParser = require('body-parser')

mongoose.connect(
	'mongodb+srv://ryfo720:5ciGqgjpTmJrhFY@trivia-ish-usersdb.ltxpc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Mongoose in connected')
	}
)

// Middleware //
app.use(bodyParser.json)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost: 3000', credentials: true }))
app.use(
	session({ secret: 'secretcode', resave: true, saveUninitialized: true })
)
app.use(cookieParser('secretcode'))

// Routes //
app.post('/login', (req, res) => {
	console.log(req.body)
})
app.post('/register', (req, res) => {
	console.log(req.body)
})
app.get('/user', (req, res) => {
	console.log(req.body)
})

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

// Start server //
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
