const express = require('express')
const trivias = express.Router()

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

trivias.use(isAuthenticated)

trivias.get('/', isAuthenticated, (req, res) => {
    res.render('trivias/trivia.ejs', {
        currentUser: req.session.currentUser})
})

module.exports = trivias
