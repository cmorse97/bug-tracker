const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	title: {
		type: String,
		required: [true, 'Please add a title for your task']
	},
	description: {
		type: String
	},
	due_date: {
		type: Date
	},
	priority: {
		type: [String],
		default: 'Low',
		enum: ['Low', 'Medium', 'High']
	},
	status: {
		type: Boolean
	}
})

module.exports = mongoose.model('Task', taskSchema)
