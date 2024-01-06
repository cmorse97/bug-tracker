import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/user/Dashboard'
import ErrorPage from './pages/ErrorPage'

// Update app to use typescript and nextjs
const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
		errorElement: <ErrorPage />
	},
	{
		path: '/register',
		element: <Register />,
		errorElement: <ErrorPage />
	},
	{
		path: '/dashboard',
		element: <Dashboard />,
		errorElement: <ErrorPage />
	}
])

const App = () => <RouterProvider router={router} />

export default App
