const express = require('express')
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

// Start server //
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
