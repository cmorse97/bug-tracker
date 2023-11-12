import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useState, useEffect, useContext } from 'react'

const Dashboard = () => {
	const { token } = useContext(AuthContext)
	console.log(token)

	const [projectData, setProjectData] = useState([])

	useEffect(() => {
		// Send GET request to backend
		const fetchProjects = async () => {
			try {
				const response = await axios.get('http://localhost:3000/api/projects', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				setProjectData(response.data.projects)
			} catch (error) {
				console.error('Error fetching projects:', error)
			}
		}

		fetchProjects()
	}, [])

	return (
		<>
			<div>Dashboard</div>
			<div>
				{projectData.map(project => (
					<li key={project._id}>{project.title}</li>
				))}
			</div>
		</>
	)
}

export default Dashboard
