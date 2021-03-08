const express = require('express')
const trivias = express.Router()
const axios = require('axios')

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

trivias.get(
	'/:topic/:questionNum/:score',
	isAuthenticated,
	async (req, res) => {
		const { topic } = req.params
		let id

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
			case 'history':
				id = 23
				break
			case 'math':
				id = 19
				break
			case 'music':
				id = 12
				break
			case 'politics':
				id = 24
				break
			case 'science':
				id = 18
				break
			default:
				id = 19
		}

		const url = `https://opentdb.com/api.php?amount=6&category=${id}&difficulty=medium&type=multiple`

		try {
			const someData = await axios.get(url)
			const triviaObj = someData.data.results

			renderTrivia(req, res, triviaObj)
		} catch (err) {
			console.error(err)
		}
	}
)

function renderTrivia(req, res, triviaObj) {
	const { questionNum } = req.params
	const { score } = req.params
	const { topic } = req.params
	const nextIndex = +questionNum + 1
	const questionObj = triviaObj[questionNum]
	const progressPercent = +questionNum * 20
	const { incorrect_answers } = questionObj
	const { correct_answer } = questionObj
	let { question } = questionObj
	let answers = incorrect_answers.concat(correct_answer)

	// Shuffle answers
	http: answers = answers.sort(() => 0.5 - Math.random())

	if (nextIndex < triviaObj.length) {
		res.render('trivias/trivia.ejs', {
			currentUser: req.session.currentUser,
			topic,
			question,
			answers,
			correct_answer,
			nextIndex,
			progressPercent,
			score,
		})
	} else {
		res.redirect('/lobby')
	}
}

module.exports = trivias
