import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Login = () => {
	const { login } = useAuth()
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// Send a POST request to backend
			const response = await axios.post(
				'http://localhost:3000/api/users/login',
				formData,
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			if (response.status === 200) {
				const token = response.data.token
				login(token)
				navigate('/')
				console.log('Login successful')
			} else {
				// @todo Error modal
				throw new Error('Error logging in user')
			}
		} catch (error) {
			console.error('Login error:', error)
		}
	}

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='formEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						name='email'
						onChange={handleChange}
						required
					/>
				</Form.Group>

				<Form.Group controlId='formPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						name='password'
						onChange={handleChange}
						required
					/>
				</Form.Group>

				<Button variant='primary' type='submit'>
					login
					{/* If login successful, redirect to '/' */}
				</Button>
			</Form>
			<Button>
				<Link to={`register`}>Register</Link>
			</Button>
		</>
	)
}

export default Login
