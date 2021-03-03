const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.get('/:id', (req, res, next) => {
	Project.findById(req.params.id)
		.then((project) => {
			if (!project) {
				res.sendStatus(404)
			} else {
				res.json(project)
			}
		})
		.catch(next)
})

router.get('/:id', (req, res, next) => {
	Project.findById(req.params.id)
		.then((project) => {
			if (!project) {
				res.sendStatus(404)
			} else {
				res.json(project)
			}
		})
		.catch(next)
})
