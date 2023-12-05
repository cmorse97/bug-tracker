import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/auth/login'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
		errorElement: <ErrorPage />
	}
])

const App = () => <RouterProvider router={router} />

export default App
