const url =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000'
		: 'https://octopi-trivia.herokuapp.com'

module.exports = url
