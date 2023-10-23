const mongoose = require('mongoose')

const projectSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Task'
			}
		],
		title: {
			type: String,
			required: [true, 'Please add a project title']
		},
		description: {
			type: String
		},
		due_date: {
			type: Date
		},
		priority: {
			type: [String],
			required: [true, 'Please set a priority level for this project.'],
			enum: ['low', 'medium', 'high']
		},
		status: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{
		timestamps: true
	}
)

projectSchema.virtual('statusText').get(() => {
	return this.status ? 'completed' : 'in progress'
})

module.exports = mongoose.model('Project', projectSchema)
