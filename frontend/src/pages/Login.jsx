import React from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../components/Button';

const Login = () => {
	const { loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
	const handleTest = async () => {
		try {
			const accessToken = await getAccessTokenSilently();

			const response = await axios.get('http://localhost:8000/api/test', {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			console.log(response); // Handle the response data
		} catch (error) {
			console.error(error);
		}
	};
	const handlePublicTest = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/public');

			console.log(response.data); // Handle the response data
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
			<h1 className='text-4xl font-bold mb-8'>Bug Tracker</h1>
			<Button onClick={handlePublicTest}>Public API Test</Button>
			<Button
				className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
				onClick={() => loginWithRedirect()}
			>
				Login with Google
			</Button>
			<Button
				onClick={() =>
					logout({ logoutParams: { returnTo: window.location.origin } })
				}
			>
				Log out
			</Button>
			<Button onClick={handleTest}>Test API call</Button>
			<footer className='mt-8 text-gray-500'>
				&copy; {new Date().getFullYear()} Bug Tracker. All rights reserved
			</footer>
		</div>
	);
};

export default Login;
