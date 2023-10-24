const asyncHandler = require('express-async-handler')

const Project = require('../models/projectModel')
const User = require('../models/userModel')
const Task = require('../models/taskModel')

// @desc Get tasks
// @route GET /api/tasks
// @access Private
const getTasks = asyncHandler(async (req, res) => {
	const tasks = await Task.find({ user: req.user.id })

	res.status(200).json({ tasks })
})

// @desc Set task
// @route POST /api/tasks
// @access Private
const setTask = asyncHandler(async (req, res) => {
	if (!req.body.title) {
		res.status(400)
		throw new Error('Please add text field')
	}

	const project = await Project.findById(req.body.projectId)

	if (!project) {
		res.status(400)
		throw new Error('Project not found')
	}

	// Check if the project belongs to the logged-in user
	if (project.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('User not authorized to add tasks to this project')
	}

	const task = await Task.create({
		user: req.user.id,
		title: req.body.title,
		description: req.body.description,
		due_date: req.body.due_date,
		priority: req.body.priority,
		status: req.body.status
	})

	const updatedTasks = [...project.tasks, task]
	project.tasks = updatedTasks
	await project.save()

	res.status(200).json({ task })
})

// @desc Update task by id
// @route PUT /api/tasks/:id
// @access Private
const updateTask = asyncHandler(async (req, res) => {
	const task = await Task.findById(req.params.id)

	if (!task) {
		res.status(400)
		throw new Error('Task not found')
	}

	const user = await User.findById(req.user.id)

	// Check for user
	if (!user) {
		res.status(401)
		throw new Error('User not found')
	}

	// Make sure the logged in user matches the task user
	if (task.user.toString() !== user.id) {
		res.status(401)
		throw new Error('User not authorized')
	}

	const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})

	res.status(200).json(updatedTask)
})

// @desc Delete task by id
// @route DELETE /api/tasks/:id
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
	const task = await Task.findById(req.params.id)

	if (!task) {
		res.status(400)
		throw new Error('Task not found')
	}

	const user = await User.findById(req.user.id)

	// Check for user
	if (!user) {
		res.status(401)
		throw new Error('User not found')
	}

	// Make sure the logged in user matches the project user
	if (task.user.toString() !== user.id) {
		res.status(401)
		throw new Error('User not authorized')
	}

	await task.deleteOne()
	res.status(200).json({ id: req.params.id })
})

module.exports = {
	getTasks,
	setTask,
	updateTask,
	deleteTask
}
