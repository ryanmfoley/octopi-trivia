const express = require('express')
const trivias = express.Router()
const axios = require('axios')

axios
	.get(
		'https://opentdb.com/api.php?amount=15&category=19&difficulty=medium&type=multiple'
	)
	.then((response) => {
		mathObject = response.data['results']
	})
	.catch((error) => {
		console.log(error)
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
	res.render('trivias/lobby.ejs', {
		currentUser: req.session.currentUser,
	})
})

// trivias.get('/:topic/:questionNum', isAuthenticated, (req, res) => {
trivias.get('/:topic/:questionNum', isAuthenticated, (req, res) => {
	const { topic } = req.params
	let id
	// console.log(topic, req.params)

	switch (topic) {
		case 'art':
			id = 25
			break
		case 'film':
			id = 11
			break
		case 'geography':
			id = 22
			break
		case 'math':
			id = 19
			break
		case 'science_computers':
			id = 18
			break
		default:
			id = 19
	}

	axios
		.get(
			`https://opentdb.com/api.php?amount=15&category=${id}&difficulty=medium&type=multiple`
		)
		.then((response) => {
			const nextIndex = +req.params.questionNum + 1
			const mathObj = response.data.results
			const questionObj = mathObj[req.params.questionNum]
			const { question } = questionObj
			const { incorrect_answers } = questionObj
			const { correct_answer } = questionObj
			let answers = incorrect_answers.concat(correct_answer)

			console.log(mathObj[req.params.questionNum])
			// Shuffle answers //
			answers = answers.sort(() => 0.5 - Math.random())
			// Redirect to trivias on last question //

			if (nextIndex <= mathObj.length) {
				res.render('trivias/trivia.ejs', {
					currentUser: req.session.currentUser,
					topic,
					question,
					answers,
					correct_answer,
					nextIndex,
				})
				//     	<a href="http://localhost:3000/trivias/math/<%=nextIndex%>"
			} else {
				res.redirect('/trivias')
			}
		})
		.catch((error) => {
			console.log(error)
		})
})

module.exports = trivias
