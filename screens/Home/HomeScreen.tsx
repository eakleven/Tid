import React from 'react'
import { StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Box from '../../components/base/Box'
import Button from '../../components/base/Button'
import Text from '../../components/base/Text'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'

const HomeScreen = () => {
	const user = auth.currentUser

	const handleSignUp = async () => {
		if (!user) return null
		try {
			await setDoc(doc(db, 'users', user.uid), {
				userId: user.uid,
				firstName: 'erik andreas',
				lastName: 'kleven',
				phoneNumber: 123456,
				email: user.email,
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Box flex={1} bg="bg2">
			<Text variant="h1" color="text2">
				Hei
			</Text>
			<Button title="Test db" onPress={handleSignUp} />
		</Box>
	)
}
export default HomeScreen
