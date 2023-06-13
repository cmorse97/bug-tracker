import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../components/Button';

const Login = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<div>
			<h1>Bug Tracker</h1>
			<Button onClick={() => loginWithRedirect()}>Login with Google</Button>

			<footer>
				&copy; {new Date().getFullYear()} Bug Tracker. All rights reserved
			</footer>
		</div>
	);
};

export default Login;
