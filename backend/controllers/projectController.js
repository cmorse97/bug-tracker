// @desc Get projects
// @route GET /api/projects
// @access Private
const getProjects = (req, res) => {
	res.status(200).json({ message: 'Get projects' });
};

// @desc Set project
// @route POST /api/projects
// @access Private
const setProject = (req, res) => {
	res.status(200).json({ message: 'Create project' });
};

// @desc Update project by id
// @route PUT /api/projects/:id
// @access Private
const updateProject = (req, res) => {
	res.status(200).json({ message: `Update project ${req.params.id}` });
};

// @desc Delete project by id
// @route DELETE /api/projects/:id
// @access Private
const deleteProject = (req, res) => {
	res.status(200).json({ message: `Delete project ${req.params.id}` });
};

module.exports = {
	getProjects,
	setProject,
	updateProject,
	deleteProject,
};
