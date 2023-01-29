import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
	CompositeNavigationProp,
	useNavigation,
} from '@react-navigation/native'
import React, { FC } from 'react'
import { RootTabParamList } from '../../components/appNavigator'
import { ProfileStackParamList } from '../../components/appNavigator/ProfileStack'
import Button from '../../components/base/Button'
import Box from '../../components/base/Box'
import Text from '../../components/base/Text'
import { getAuth } from 'firebase/auth'
import { firebase } from '../../config/firebase'

type NavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<RootTabParamList, 'Settings'>,
	NativeStackNavigationProp<ProfileStackParamList>
>

interface Props {
	navigation: NavigationProp
}

const ProfileScreen: FC<Props> = ({ navigation }) => {
	const { navigate } = useNavigation<NavigationProp>()
	const auth = getAuth(firebase)

	return (
		<Box bg="bg1" flex={1}>
			<Text variant="h2">Hei</Text>
			<Button
				title={'Tilbake til settings'}
				onPress={() => navigate('Settings')}
			/>
		</Box>
	)
}

export default ProfileScreen
