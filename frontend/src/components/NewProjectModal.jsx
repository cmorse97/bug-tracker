import { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const NewProjectModal = ({ showModal, setShowModal }) => {
	useEffect(() => {
		console.log('hello from Modal')
	}, [])
	const handleClose = () => setShowModal(false)

	return (
		<Modal show={showModal} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>New Project</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>Title</Form.Label>
						<Form.Control type='text' placeholder='Project Title' autoFocus />
					</Form.Group>
					<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
						<Form.Label>Example textarea</Form.Label>
						<Form.Control as='textarea' rows={3} />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				<Button variant='primary' onClick={handleClose}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default NewProjectModal
