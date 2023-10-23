const asyncHandler = require('express-async-handler')

const Project = require('../models/projectModel')
const User = require('../models/userModel')
const Task = require('../models/taskModel')

// @desc Get projects
// @route GET /api/projects
// @access Private
const getProjects = asyncHandler(async (req, res) => {
	const projects = await Project.find({ user: req.user.id })

	res.status(200).json({ projects })
})

// @desc Set project
// @route POST /api/projects
// @access Private
const setProject = asyncHandler(async (req, res) => {
	if (!req.body.title) {
		res.status(400)
		throw new Error('Please add text field')
	}

	// Fetch and verify tasks
	const tasks = await Task.find({
		_id: { $in: req.body.tasks },
		user: req.user.id // Ensure tasks belong to the user
	})

	if (tasks.length !== req.body.tasks.length) {
		res.status(400)
		throw new Error('Invalid task(s) provided.')
	}

	const project = await Project.create({
		user: req.user.id,
		tasks: tasks.map(task => task._id),
		title: req.body.title,
		description: req.body.description,
		due_date: req.body.due_date,
		priority: req.body.priority,
		status: req.body.status
	})

	res.status(200).json({ project })
})

// @desc Update project by id
// @route PUT /api/projects/:id
// @access Private
const updateProject = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id)

	if (!project) {
		res.status(400)
		throw new Error('Project not found')
	}

	const user = await User.findById(req.user.id)

	// Check for user
	if (!user) {
		res.status(401)
		throw new Error('User not found')
	}

	// Make sure the logged in user matches the project user
	if (project.user.toString() !== user.id) {
		res.status(401)
		throw new Error('User not authorized')
	}

	const updatedProject = await Project.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true
		}
	)

	res.status(200).json(updatedProject)
})

// @desc Delete project by id
// @route DELETE /api/projects/:id
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id)

	if (!project) {
		res.status(400)
		throw new Error('Project not found')
	}

	const user = await User.findById(req.user.id)

	// Check for user
	if (!user) {
		res.status(401)
		throw new Error('User not found')
	}

	// Make sure the logged in user matches the project user
	if (project.user.toString() !== user.id) {
		res.status(401)
		throw new Error('User not authorized')
	}

	await project.deleteOne()
	res.status(200).json({ id: req.params.id })
})

module.exports = {
	getProjects,
	setProject,
	updateProject,
	deleteProject
}
