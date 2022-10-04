import { ThemeProvider } from '@shopify/restyle'
import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './components/appNavigator'
import theme from './lib/Theme'

export default function App() {
	return (
		<SafeAreaProvider>
			<ThemeProvider theme={theme}>
				<StatusBar />
				<AppNavigator />
			</ThemeProvider>
		</SafeAreaProvider>
	)
}
