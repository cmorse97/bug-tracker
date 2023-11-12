import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import { useHistory } from 'react-router-dom'

const Register = () => {
	// const history = useHistory()
	const [formData, setFormData] = useState({
		username: '',
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
			const response = await axios.post('http://localhost:3000/api/users', {
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})

			if (response.ok) {
				const { token } = await response.json()

				// Store the token in an HTTP-only cookie
				document.cookie = `token=${token}; path=/; secure; HttpOnly`

				console.log('Registration successful')
			} else {
				// @todo Error modal
				throw new Error('Error registering user')
			}
		} catch (error) {
			console.error('Registration error:', error)
		}
	}

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='formUsername'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type='text'
						name='username'
						onChange={handleChange}
						required
					/>
				</Form.Group>

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
					<Link to={`/homepage`}>Register</Link>
				</Button>
			</Form>
		</>
	)
}

export default Register
