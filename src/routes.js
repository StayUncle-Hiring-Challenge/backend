import {Router} from 'express'
import User from './db/models/User'
import bcrypt from 'bcryptjs'
const router = new Router()

const isUndefined = (param) => {
	if(typeof param !== 'undefined') {
		return true
	}

	return false
}

const isLoggedIn = (req, res, next) => {
	if(!req.session.user && isUndefined(req.session.user._id)) {
		next()
	} else {
		res.json({
			user: null,
			error: 'user is already logged in'
		})
	}
}

router.post('/login', isLoggedIn, (req, res) => {
	if(isUndefined(req.body.email) && isUndefined(req.body.password)) {
		User.findOne({email: req.body.email}).populate('hotels').exec((err, user) => {
			if(err) {
				res.status(500).json({
					user: null,
					error: 'server issue'
				})	
			}
			if(!user) {
				res.json({
					user: null,
					error: 'wrong'
				})
			} else {
				if(bcrypt.compareSync(req.body.password, user.password)) {
					req.session.user = user
					res.json({
						user: {
							name: user.name,
							hotels: user.hotels
						},
						error: null
					})
				} else {
					res.json({
						user: null,
						error: 'wrong'
					})
				}
			}
		})
	} else {
		res.json({
			error: 'please provide email and password',
			user: null
		})
	}
})

export default router