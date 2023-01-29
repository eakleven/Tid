import { ThemeProvider } from '@shopify/restyle'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import AppNavigator from './components/appNavigator'
import theme from './lib/Theme'
import store from './redux/store'
import { getUser, setUser } from './redux/userSlice'
import LoginScreen from './screens/LoginScreen'
import { initializeApp } from 'firebase/app'
import { auth, firebaseConfig } from './config/firebase'
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'

export default function App() {
	// const firebase = initializeApp(firebaseConfig)
	// const auth = getAuth(firebase)

	const handleSignOut = async () => {
		try {
			await auth.signOut()
		} catch (error) {
			console.log(error)
		}
	}
	const [authorizedUser, setAuthorizedUser] = useState(false)

	useEffect(() => {
		// onAuthStateChanged returns an unsubscriber
		auth.onAuthStateChanged((user: any) => {
			if (user) {
				store.dispatch(getUser(user.uid))
				setAuthorizedUser(true)
			} else {
				store.dispatch(setUser(null))
				setAuthorizedUser(false)
			}
		})
	}, [])

	const renderApp = () => {
		if (authorizedUser) {
			return (
				<>
					<StatusBar />
					<AppNavigator />
				</>
			)
		} else {
			return <LoginScreen auth={auth} />
		}
	}
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<ThemeProvider theme={theme}>{renderApp()}</ThemeProvider>
			</Provider>
		</SafeAreaProvider>
	)
}
