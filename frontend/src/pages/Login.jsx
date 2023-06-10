import React from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../components/Button';

const Login = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
			<h1 className='text-4xl font-bold mb-8'>Bug Tracker</h1>
			<Button
				className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
				onClick={() => loginWithRedirect()}
			>
				Login with Google
			</Button>

			<footer className='mt-8 text-gray-500'>
				&copy; {new Date().getFullYear()} Bug Tracker. All rights reserved
			</footer>
		</div>
	);
};

export default Login;
