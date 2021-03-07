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



trivias.get('/:topic/:num', isAuthenticated, (req, res) => {

    topicsObject = {
        "art": 25,
        "film": 11,
        "geography": 22,
        "math" : 19,
        "science_computers": 18,
        "music": 12
    }

    let topicID = topicsObject[req.params.topic]
    console.log(`subject: ${req.params.topic} ID: ${topicID}`);

    // axios request
    let questionsArray;
    axios.get(`https://opentdb.com/api.php?amount=5&category=${topicID}&difficulty=medium&type=multiple`).then((response) => {

        questionsArray = response.data.results
        console.log("this is the information: ", questionsArray );



        // next index of the next question within the array
        const index = parseInt(req.params.num)
        console.log(`index: ${index}`);

        const nextIndex = index + 1
        console.log(`next index: ${nextIndex}`);

        // Question Object at a given index
        let questionObject = questionsArray[index]
        console.log(`the questionObject: ${questionObject}`);

        // The Trivia Question string
        let questionString = questionObject["question"]
        console.log(`the question string: ${questionString}`);

        // grabs the incorrect answers from the question object
        let incorrectAnswersArray = questionObject["incorrect_answers"]
        console.log(`Incorrect answer array: ${incorrectAnswersArray}`);

        // grabs the correct answers from the question object
        let correctAnswer = questionObject["correct_answer"]
        console.log(`Correct answer: ${correctAnswer}`);

        // concatenates the incorrect and correct answers into an array
        let answersArray = incorrectAnswersArray.concat(correctAnswer)
        console.log(`All of the answers array: ${answersArray}`);

        // Shuffle answer array

        let shuffledAnswersArray = answersArray.sort(() =>
            .5 - Math.random()
        )
        console.log(`Shuffle Answers Array: ${shuffledAnswersArray}`);
        if (nextIndex < questionsArray.length) {
            res.render('trivias/trivia.ejs', {
                    currentUser: req.session.currentUser,
                    topic: req.params.topic,
                    question: questionString,
                    answers: shuffledAnswersArray,
                    nextIndex: nextIndex,
                    correctAnswer: correctAnswer
            })
        } else if (nextIndex >= questionsArray.length){
            res.redirect('/lobby')
        }


        // res.send('hello world')

    }).catch((error) => {
        console.log(error);
    })




})

module.exports = trivias
