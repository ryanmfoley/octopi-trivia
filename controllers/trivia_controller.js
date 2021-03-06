const express = require('express')
const trivias = express.Router()
const axios = require('axios')

let mathObject = ""

axios.get('https://opentdb.com/api.php?amount=15&category=19&difficulty=medium&type=multiple').then((response) => {
    mathObject = response.data["results"]
    console.log(mathObject);

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


trivias.get('/math/:questionNum', isAuthenticated, (req, res) => {
    let nextIndex = parseInt(req.params.questionNum) + 1;

    if (nextIndex <= mathObject.length) {
        res.render('trivias/math.ejs',{
            currentUser: req.session.currentUser,
            mathObject: mathObject[req.params.questionNum],
            nextIndex: nextIndex
        })
    } else {
        res.redirect('/trivias')
    }

})


module.exports = trivias
