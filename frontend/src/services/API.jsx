import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8000',
});

export const fetchData = async () => {
	try {
		const response = await api.get('/auth/google');
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
};
