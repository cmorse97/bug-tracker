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
	Checkbox,
	Button
} from '@material-tailwind/react'

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
				// sessionStorage.setItem('jwtToken', token)

				login(token)
				navigate('/dashboard')
			} else {
				// @todo Error modal
				throw new Error('Error logging in user')
			}
		} catch (error) {
			console.error('Login error:', error)
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
						Sign In
					</Typography>
				</CardHeader>
				<CardBody className='flex flex-col gap-4'>
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
					<div className='-ml-2.5'>
						<Checkbox label='Remember Me' />
					</div>
				</CardBody>
				<CardFooter className='pt-0'>
					<Button
						variant='gradient'
						fullWidth
						type='submit'
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<Typography variant='small' className='flex justify-center mt-6'>
						Don&apos;t have an account?
						<Typography
							variant='small'
							color='blue-gray'
							className='ml-1 font-bold'
						>
							<Link to='/register'>Sign Up</Link>
						</Typography>
					</Typography>
				</CardFooter>
			</Card>
		</div>
	)
}

export default Login
