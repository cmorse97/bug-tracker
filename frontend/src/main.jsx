import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import Root from './routes/root.jsx'
import Header from './components/Header.jsx'
import Login from './pages/Login.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { FaSpinner } from 'react-icons/fa'
import './index.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
		errorElement: <ErrorPage />
	},
	{
		path: 'register',
		element: <Register />,
		errorElement: <ErrorPage />
	},
	{
		path: 'login',
		element: <Login />,
		errorElement: <ErrorPage />
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} fallbackElement={<FaSpinner />} />
		</AuthProvider>
	</React.StrictMode>
)
