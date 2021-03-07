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

trivias.get('/:topic/:questionNum', isAuthenticated, async (req, res) => {
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

	const url = `https://opentdb.com/api.php?amount=5&category=${id}&difficulty=medium&type=multiple`

	try {
		const someData = await axios.get(url)
		const triviaObj = someData.data.results
		renderTrivia(req, res, triviaObj)
	} catch (err) {
		console.error(err)
	}
})

// 	axios
// 		.get(url)
// 		.then((response) => {
// 			const { results: triviaObj } = response.data
// 			renderTrivia(req, res, triviaObj)
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 		})
// })

function renderTrivia(req, res, triviaObj) {
	const { topic } = req.params
	const { questionNum } = req.params
	// const triviaObj = resp.data['results']
	const nextIndex = +req.params.questionNum + 1
	const questionObj = triviaObj[questionNum]
	const { question } = questionObj
	const { incorrect_answers } = questionObj
	const { correct_answer } = questionObj
	let answers = incorrect_answers.concat(correct_answer)

	// Shuffle answers
	answers = answers.sort(() => 0.5 - Math.random())

	if (nextIndex <= triviaObj.length) {
		// if (true) {
		res.render('trivias/trivia.ejs', {
			currentUser: req.session.currentUser,
			topic,
			question,
			answers,
			correct_answer,
			nextIndex,
		})
	} else {
		res.redirect('/trivias')
	}
}

//     	<a href="http://localhost:3000/trivias/math/<%=nextIndex%>"

// axios
// 	.get(
// 		`https://opentdb.com/api.php?amount=15&category=${id}&difficulty=medium&type=multiple`
// 	)
// 	.then((response) => {
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 		})
// async function sendGetRequest(id) {
// 	try {
// 		const resp = await axios.get(
// 			`https://opentdb.com/api.php?amount=15&category=${id}&difficulty=medium&type=multiple`
// 		)
// 		console.log(resp.data)
// 	} catch (err) {
// 		// Handle Error Here
// 		console.error(err)
// 	}
// }
// const { topic } = req.params
// axios
// 	.get(
// 		`https://opentdb.com/api.php?amount=15&category=${id}&difficulty=medium&type=multiple`
// 	)
// 	.then((response) => {
// 		const nextIndex = +req.params.questionNum + 1
// 		const mathObj = response.data.results
// 		const questionObj = mathObj[req.params.questionNum]

// 		const { question } = questionObj
// 		// let question = questionObj.question
// 		const { incorrect_answers } = questionObj
// 		const { correct_answer } = questionObj
// 		let answers = incorrect_answers.concat(correct_answer)
// 		// Shuffle answers //
// 		answers = answers.sort(() => 0.5 - Math.random())
// 		if (nextIndex <= mathObj.length) {
// 			res.render('trivias/trivia.ejs', {
// 				currentUser: req.session.currentUser,
// 				topic,
// 				question,
// 				answers,
// 				correct_answer,
// 				nextIndex,
// 			})
// 			//     	<a href="http://localhost:3000/trivias/math/<%=nextIndex%>"
// 		} else {
// 			res.redirect('/trivias')
// 		}
// 	})
// 	.catch((error) => {
// 		console.log(error)
// 	})
// })

module.exports = trivias
