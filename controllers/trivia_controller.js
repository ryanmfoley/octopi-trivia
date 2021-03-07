const express = require('express')
const trivias = express.Router()
const axios = require('axios')

// axios
// 	.get(
// 		'https://opentdb.com/api.php?amount=15&category=19&difficulty=medium&type=multiple'
// 	)
// 	.then((response) => {
// 		mathObject = response.data['results']
// 	})
// 	.catch((error) => {
// 		console.log(error)
// 	})

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
    topicsObject = {
        "art": 25,
        "film": 11,
        "geography": 22,
        "math" : 19,
        "science_computers": 18
    }
    let topicID = topicsObject[req.params.topic]
    console.log(`subject: ${req.params.topic} ID: ${topicID}`);
    axios.get(`https://opentdb.com/api.php?amount=15&category=${topicID}&difficulty=medium&type=multiple`).then((response) => {
        const questions_array = response.data.results
        console.log(response.data.results);
        const nextIndex = parseInt(req.params.questionNum) + 1
        console.log(`next index: ${nextIndex}`);
        const topicObj = response.data.results
        // console.table(`topic object: ${JSON.stringify(topicObj)}`);
        const questionObj = topicObj[req.params.questionNum]
        console.table(`questionObj: ${JSON.stringify(questionObj)}`);
        const answersArray = questionObj["incorrect_answers"].concat(questionObj["correct_answer"])
        console.log(`answers array: ${answersArray}`);


        // SHUFFLE ANSWERS

        answersArray = answers.sort(() => .5 - Math.random()

        )

        if (nextIndex <= topic_array.length ) {
            res.render('trivias/trivia.ejs', {
                currentUser: req.session.currentUser,
                topic: req.params.topic,
                question:

            })
        }

    })
	// const { topic } = req.params
	// let id
	// console.log(topic, req.params)
    //
	// switch (topic) {
	// 	case 'art':
	// 		id = 25
	// 		break
	// 	case 'film':
	// 		id = 11
	// 		break
	// 	case 'geography':
	// 		id = 22
	// 		break
	// 	case 'math':
	// 		id = 19
	// 		break
	// 	case 'science_computers':
	// 		id = 18
	// 		break
	// 	default:
	// 		id = 19
	// }
    //
	// axios
	// 	.get(
	// 		`https://opentdb.com/api.php?amount=15&category=${id}&difficulty=medium&type=multiple`
	// 	)
	// 	.then((response) => {
	// 		const nextIndex = +req.params.questionNum + 1
	// 		const mathObj = response.data.results
	// 		const questionObj = mathObj[req.params.questionNum]
	// 		const { question } = questionObj
	// 		const { incorrect_answers } = questionObj
	// 		const { correct_answer } = questionObj
	// 		let answers = incorrect_answers.concat(correct_answer)
    //
	// 		console.log(mathObj[req.params.questionNum])
	// 		// Shuffle answers //
	// 		answers = answers.sort(() => 0.5 - Math.random())
	// 		// Redirect to trivias on last question //
    //
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
})

module.exports = trivias
