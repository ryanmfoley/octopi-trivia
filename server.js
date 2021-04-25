// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')

// Configuration
require('dotenv').config()
const app = express()
const db = mongoose.connection
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI
// Middleware
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
	})
)
app.use('/public', express.static('public'))

// Mongo connection // Database
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

db.on('error', (err) => {
	console.log(err.message + ' is mongod not running?')
})

db.on('disconnected', () => {
	console.log('mongo disconnected')
})

// Controllers
const triviasController = require('./controllers/trivia.js')
app.use('/lobby', triviasController)

const userController = require('./controllers/users.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

// Routes
app.get('/', (req, res) => {
	res.redirect('/lobby')
})

app.listen(PORT, () => {
	console.log('Listening on port, ', PORT)
})
