import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Button
} from '@material-tailwind/react'

const Register = () => {
	const { login } = useAuth()
	const navigate = useNavigate()
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
				const token = response.data.token
				sessionStorage.setItem('jwtToken', token)
				login(token)
				navigate('/dashboard')
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
		<div className='flex items-center justify-center h-screen'>
			<Card className='w-96'>
				<CardHeader
					variant='gradient'
					color='gray'
					className='grid mb-4 h-28 place-items-center'
				>
					<Typography variant='h3' color='white'>
						Sign Up
					</Typography>
				</CardHeader>
				<CardBody className='flex flex-col gap-4'>
					<Input
						label='Username'
						size='lg'
						onChange={handleChange}
						name='username'
						value={formData.username}
					/>
					<Input
						label='Email'
						size='lg'
						onChange={handleChange}
						name='email'
						value={formData.email}
					/>
					<Input
						label='Password'
						size='lg'
						onChange={handleChange}
						name='password'
						value={formData.password}
					/>
				</CardBody>
				<CardFooter className='pt-0'>
					<Button
						variant='gradient'
						fullWidth
						type='submit'
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Typography variant='small' className='flex justify-center mt-6'>
						Already have an account?
						<Typography
							variant='small'
							color='blue-gray'
							className='ml-1 font-bold'
						>
							<Link to='/'>Sign In</Link>
						</Typography>
					</Typography>
				</CardFooter>
			</Card>
		</div>
	)
}

export default Register
