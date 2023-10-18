const asyncHandler = require('express-async-handler');

const Project = require('../models/projectModel');

// @desc Get projects
// @route GET /api/projects
// @access Private
const getProjects = asyncHandler(async (req, res) => {
	const projects = await Project.find();

	res.status(200).json({ projects });
});

// @desc Set project
// @route POST /api/projects
// @access Private
const setProject = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add text field');
	}

	const project = await Project.create({
		name: req.body.text,
	});

	res.status(200).json({ project });
});

// @desc Update project by id
// @route PUT /api/projects/:id
// @access Private
const updateProject = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id);

	if (!project) {
		res.status(400);
		throw new Error('Project not found');
	}

	const updatedProject = await Project.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);

	res.status(200).json(updatedProject);
});

// @desc Delete project by id
// @route DELETE /api/projects/:id
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id);

	if (!project) {
		res.status(400);
		throw new Error('Project not found');
	}

	await project.deleteOne();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getProjects,
	setProject,
	updateProject,
	deleteProject,
};
