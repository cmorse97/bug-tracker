import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Root from './routes/root.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import RegisterUser from './routes/RegisterUser.jsx'
import Homepage from './pages/Homepage.jsx'
import './index.css'

const router = createBrowserRouter([

		errorElement: <ErrorPage />
	},
	{
		path: 'homepage',
		element: <Homepage />,
		errorElement: <ErrorPage />
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
