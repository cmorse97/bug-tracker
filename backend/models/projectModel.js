const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a project name'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Project', projectSchema);
