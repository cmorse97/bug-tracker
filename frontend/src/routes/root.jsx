import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Root = () => {
	const { login } = useAuth()
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
				{
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				}
			)

			if (response.ok) {
				const { token } = await response.json()

				// Store the token in an HTTP-only cookie
				document.cookie = `token=${token}; path=/; secure; HttpOnly`

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
					<Link to={`homepage`}>Login</Link>
				</Button>
			</Form>
			<Button>
				<Link to={`register`}>Register</Link>
			</Button>
		</>
	)
}

export default Root
