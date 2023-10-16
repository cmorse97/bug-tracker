const asyncHandler = require('express-async-handler');

// @desc Get projects
// @route GET /api/projects
// @access Private
const getProjects = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Get projects' });
});

// @desc Set project
// @route POST /api/projects
// @access Private
const setProject = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add text field');
	}

	console.log(req.body.text);

	res.status(200).json({ message: 'Create project' });
});

// @desc Update project by id
// @route PUT /api/projects/:id
// @access Private
const updateProject = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Update project ${req.params.id}` });
});

// @desc Delete project by id
// @route DELETE /api/projects/:id
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete project ${req.params.id}` });
});

module.exports = {
	getProjects,
	setProject,
	updateProject,
	deleteProject,
};
