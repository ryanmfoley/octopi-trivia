const express = require('express')
const trivias = express.Router()
const axios = require('axios')

let mathQuestion = ""
axios.get('https://opentdb.com/api.php?amount=15&category=19&difficulty=medium&type=multiple').then((response) => {
    console.log(response.data["results"][0]["question"])
    mathQuestion = response.data["results"][0]["question"]

}).catch((error) => {
    console.log(error);
})




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


trivias.get('/math', isAuthenticated, (req, res) => {
    res.render('trivias/math.ejs',{
        currentUser: req.session.currentUser,
        mathQuestion: mathQuestion
    })
})



module.exports = trivias
