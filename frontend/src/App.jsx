import Login from './pages/Login';
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
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<Button
					onClick={() =>
						logout({ logoutParams: { returnTo: window.location.origin } })
					}
				>
					Log out
				</Button>
				<Button onClick={handleTest}>Test API call</Button>
			</div>
		);
	} else {
		return <Login />;
	}
}

export default App;
