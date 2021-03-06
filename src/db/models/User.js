import mongoose, {Schema} from 'mongoose'

const UserSchema = new Schema({
	name: String,
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: String,
	money: {
		type: Number,
		default: 0
	}
})

module.exports = mongoose.model('User', UserSchema)