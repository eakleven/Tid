import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '@shopify/restyle'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { Theme } from '../../lib/Theme'
import ProfileScreen from '../../screens/Settings/ProfileScreen'
import SettingsScreen from '../../screens/Settings/SettingsScreen'

export type ProfileStackParamList = {
	SettingsScreen: undefined
	ProfileScreen: undefined
}

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>()

const ProfileStackScreen = () => {
	const theme = useTheme<Theme>()
	return (
		<ProfileStack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: theme.colors.bg2 },
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: theme.colors.text2,
				},

				headerTintColor: theme.colors.text1,
				headerShadowVisible: false,
			}}
		>
			<ProfileStack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{ title: 'Settings' }}
			/>
			<ProfileStack.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={({ navigation }) => ({
					headerLeft: () => (
						<IconButton icon="arrow-left" onPress={navigation.goBack} />
					),
					title: 'Profile',
				})}
			/>
		</ProfileStack.Navigator>
	)
}
export default ProfileStackScreen
