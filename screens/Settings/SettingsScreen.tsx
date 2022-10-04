import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
	CompositeNavigationProp,
	useNavigation,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { RootTabParamList } from '../../components/appNavigator'
import { ProfileStackParamList } from '../../components/appNavigator/ProfileStack'
import Box from '../../components/base/Box'
import Text from '../../components/base/Text'

import Button from '../../components/base/Button'

type NavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<RootTabParamList, 'Profile'>,
	NativeStackNavigationProp<ProfileStackParamList>
>

const SettingsScreen = () => {
	const { navigate } = useNavigation<NavigationProp>()

	return (
		<Box bg="bg1" flex={1}>
			<Text variant="h2">Hei</Text>

			<Button title={'Naviger'} onPress={() => navigate('ProfileScreen')} />
		</Box>
	)
}

export default SettingsScreen
