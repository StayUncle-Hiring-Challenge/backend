import expressSession from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
const cors = require('cors')
const sess = new expressSession({
	secret: "yoyo-boy-showttime" + Math.random().toString(36).substr(7),
	resave: true,
	saveUninitialized: true
})

export default (app) => {
	app.use(cors());	
	app.use(cookieParser())
	app.use(bodyParser.json())
	app.use(sess)
}