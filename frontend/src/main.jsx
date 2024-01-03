import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ThemeProvider>
	</React.StrictMode>
)
