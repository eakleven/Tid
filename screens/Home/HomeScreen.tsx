import React, { useEffect } from 'react'
import Box from '../../components/base/Box'
import Text from '../../components/base/Text'
import { auth } from '../../config/firebase'
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

	return (
		<Box flex={1} bg="bg2">
			<Text variant="h1" color="text2">
				Hei
			</Text>
		</Box>
	)
}
export default HomeScreen
