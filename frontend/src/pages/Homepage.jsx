import axios from 'axios'
import { useState, useEffect } from 'react'

const Homepage = () => {
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
				setProjectData(response.data.projectData)
			} catch (error) {
				console.error('Error fetching projects:', error)
			}
		}

		fetchProjects()
	}, [])

	return (
		<>
			<div>Homepage</div>
			<div>
				{projectData.map(project => (
					<li key={project._id}>{project.title}</li>
				))}
			</div>
		</>
	)
}

export default Homepage
