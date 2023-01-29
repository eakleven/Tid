import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
	CompositeNavigationProp,
	useNavigation,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { RootTabParamList } from '../../components/appNavigator'
import { ProfileStackParamList } from '../../components/appNavigator/ProfileStack'
import Box from '../../components/base/Box'
import Text from '../../components/base/Text'

import Button from '../../components/base/Button'
import { getAuth } from 'firebase/auth'
import { firebase } from '../../config/firebase'
import { useUser } from '../../redux/userSlice'
import { RestyleSpacing } from '../../lib/Theme'

type NavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<RootTabParamList, 'Settings'>,
	NativeStackNavigationProp<ProfileStackParamList>
>

interface ShowInfo {
	desc: string
	value: string | number
}

const ShowInfo: FC<ShowInfo> = ({ desc, value }) => {
	return (
		<Box flexDirection="row" justifyContent="space-between">
			<Text variant="h2" color="text1" paddingBottom="s">
				{desc}
			</Text>
			<Text variant="h2" color="text1">
				{value}
			</Text>
		</Box>
	)
}

const SettingsScreen = () => {
	const { navigate } = useNavigation<NavigationProp>()
	const user = useUser()

	const auth = getAuth(firebase)

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
				<ShowInfo desc="First name:" value={user.firstName} />
				<ShowInfo desc="Last name:" value={user.lastName} />
				<ShowInfo desc="Email:" value={user.email} />
				<ShowInfo desc="Phone number:" value={user.phoneNumber} />
			</Box>

			<Button title={'Sign out'} onPress={() => auth.signOut()} />
		</Box>
	)
}

export default SettingsScreen
