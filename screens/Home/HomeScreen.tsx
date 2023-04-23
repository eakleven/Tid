import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Box from '../../components/base/Box'
import Button from '../../components/base/Button'
import Text from '../../components/base/Text'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { getUser, useUser } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'

const HomeScreen = () => {
	const FBUser = auth.currentUser
	const user = useUser()
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (!user && FBUser) {
			console.log(FBUser.uid)

			dispatch(getUser(FBUser?.uid))
		}
	})

	// const handleSignUp = async () => {
	// 	if (!FBUser) return null
	// 	try {
	// 		await setDoc(doc(db, 'users', FBUser.uid), {
	// 			userId: FBUser.uid,
	// 			firstName: 'erik andreaaas',
	// 			lastName: 'kleven',
	// 			phoneNumber: 123456,
	// 			email: FBUser.email,
	// 		})
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	return (
		<Box flex={1} bg="bg2">
			<Text variant="h1" color="text2">
				Hei
			</Text>
			{/* <Button title="Lag bruker" onPress={handleSignUp} /> */}
		</Box>
	)
}
export default HomeScreen
