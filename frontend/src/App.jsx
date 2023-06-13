import Login from './pages/Login';
import Profile from './pages/Profile';
import Button from './components/Button';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import './styles/index.css';

function App() {
	const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } =
		useAuth0();
	const handleTest = async () => {
		try {
			const accessToken = await getAccessTokenSilently();

			const response = await axios.get('http://localhost:8000/api/test', {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			console.log(response.data); // Handle the response data
		} catch (error) {
			console.error(error);
		}
	};

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }

	if (isAuthenticated) {
		return (
			<div>
				{/* @todo - this is where your dashboard (main app) will live */}
				<Profile user={user} />
				<Button onClick={handleTest}>Test API call</Button>
			</div>
		);
	} else {
		return <Login />;
	}
}

export default App;
