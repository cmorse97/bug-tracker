import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
	const { user, logout, getAccessTokenSilently } = useAuth0();

	const handleTest = async () => {
		try {
			const accessToken = await getAccessTokenSilently();

			const response = await axios.get('http://localhost:8000/api/test', {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			console.log(accessToken);
			console.log(response.data); // Handle the response data
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div>
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</div>
			<Button
				variant='contained'
				onClick={() =>
					logout({ logoutParams: { returnTo: window.location.origin } })
				}
			>
				Log out
			</Button>
			<Button variant='contained' onClick={handleTest}>
				Test API call
			</Button>
			<Button>
				<Link to='dashboard'>Dashboard</Link>
			</Button>
		</>
	);
};

export default Profile;
