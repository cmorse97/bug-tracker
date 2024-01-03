import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

const Dashboard = () => {
	const { token, logout } = useContext(AuthContext)
	const navigate = useNavigate()

	const [projectData, setProjectData] = useState([])

	useEffect(() => {
		// Send GET request to backend
		const fetchProjects = async () => {
			if (token) {
				try {
					const response = await axios.get(
						'http://localhost:3000/api/projects',
						{
							headers: {
								Authorization: `Bearer ${token}`
							}
						}
					)
					setProjectData(response.data.projects)
				} catch (error) {
					console.error('Error fetching projects:', error)
				}
			}
		}

		fetchProjects()
	}, [token])

	const handleLogout = () => {
		logout(null)
		navigate('/')
	}

	return (
		<>
			<div>Dashboard</div>
			<div>
				{projectData.map(project => (
					<li key={project._id}>{project.title}</li>
				))}
			</div>
			<Button onClick={handleLogout}>logout</Button>
		</>
	)
}

export default Dashboard
