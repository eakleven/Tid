import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
	CompositeNavigationProp,
	useNavigation,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC, useEffect } from 'react'
import { RootTabParamList } from '../../components/appNavigator'
import { ProfileStackParamList } from '../../components/appNavigator/ProfileStack'
import Box from '../../components/base/Box'
import Text from '../../components/base/Text'

import Button from '../../components/base/Button'
import { getAuth } from 'firebase/auth'
import { auth, db } from '../../config/firebase'
import { firebase } from '../../config/firebase'
import { getUser, useUser } from '../../redux/userSlice'
import { RestyleSpacing } from '../../lib/Theme'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import ShowInfo from '../../components/base/ShowInfo'

type NavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<RootTabParamList, 'Settings'>,
	NativeStackNavigationProp<ProfileStackParamList>
>

const SettingsScreen = () => {
	const { navigate } = useNavigation<NavigationProp>()
	const FBUser = auth.currentUser

	const user = useUser()
	const dispatch = useDispatch<AppDispatch>()

	const getAutho = getAuth(firebase)

	useEffect(() => {
		if (!user && FBUser) {
			dispatch(getUser(FBUser?.uid))
		}
	})

	if (!user) {
		return (
			<Box bg="bg1" flex={1}>
				<Text variant="h2">Hei</Text>
				<Text variant="h2">Hei</Text>
			</Box>
		)
	}

	return (
		<Box bg="bg1" flex={1}>
			<Box paddingHorizontal="m" paddingTop="m">
				<ShowInfo desc="Fornavn:" value={user.firstName} />
				<ShowInfo desc="Etternavn:" value={user.lastName} />
				<ShowInfo desc="Email:" value={user.email} />
				<ShowInfo desc="Telefonnummer:" value={user.phoneNumber} />
			</Box>
			<Box alignContent="center" alignItems="center" paddingVertical="l">
				<Text variant="body">App version: </Text>
				<Text variant="body">Build: </Text>
			</Box>

			<Button
				title={'Logg ut'}
				backgroundColor="danger"
				onPress={() => auth.signOut()}
			/>
		</Box>
	)
}

export default SettingsScreen
