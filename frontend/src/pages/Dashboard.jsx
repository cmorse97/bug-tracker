import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import NewProjectModal from '../components/NewProjectModal'
import Header from '../components/Header'

const Dashboard = () => {
	const { token } = useContext(AuthContext)

	const [projectData, setProjectData] = useState([])
	const [showModal, setShowModal] = useState(false)

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

	const handleClick = () => {}

	return (
		<>
			<Header />
			<div>Dashboard</div>
			<div>
				{projectData.map(project => (
					<li key={project._id}>{project.title}</li>
				))}
			</div>
			<Button variant='primary' onClick={() => setShowModal(!showModal)}>
				New Project
			</Button>
			<NewProjectModal showModal={showModal} setShowModal={setShowModal} />
		</>
	)
}

export default Dashboard
