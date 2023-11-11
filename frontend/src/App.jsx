import { useState } from 'react'
import RegisterUser from './routes/RegisterUser'

import './App.css'

const App = () => {
	return (
		<>
			<RegisterUser />
			<h1>Bug Tracker Pro</h1>
			<h2> Hey I just made a breaking change to my code</h2>
		</>
	)
}

export default App
