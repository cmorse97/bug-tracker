import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Auth0Provider
			domain='dev-c6jfluhthfm1zyy1.us.auth0.com'
			clientId='N5xe9uyK99Xl5jceN45ZiVPZKWHmIFGC'
			authorizationParams={{
				redirect_uri: window.location.origin,
				audience: 'https://dev-c6jfluhthfm1zyy1.us.auth0.com/api/v2/',
			}}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>
);
