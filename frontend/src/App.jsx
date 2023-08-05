import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
	const { isAuthenticated, isLoading, logout } = useAuth0();

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }

	if (isAuthenticated) {
		return (
			<div>
				{/* @todo - this is where your dashboard (main app) will live */}
				<Dashboard />
				<button onClick={logout}>Logout</button>
			</div>
		);
	} else {
		return <Login />;
	}
}

export default App;
