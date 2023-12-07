import { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null)

	useEffect(() => {
		// @todo - redirect if token does not exist

		const token = sessionStorage.getItem('jwtToken')
		setToken(token)
	}, [])

	const login = newToken => {
		sessionStorage.setItem('jwtToken', newToken)
		setToken(newToken)
	}

	const logout = () => {
		setToken(null)
	}

	return (
		<AuthContext.Provider value={{ token, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
