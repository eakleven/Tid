import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
import { NavigationContainer } from '@react-navigation/native'
import ArchiveStack from './ArchiveStack'

export type RootTabParamList = {
	Home: undefined
	Archive: undefined
	Profile: undefined
}

const AppNavigator = () => {
	const Tab = createBottomTabNavigator<RootTabParamList>()
	return (
		<NavigationContainer>
			<Tab.Navigator screenOptions={{ headerShown: false }}>
				<Tab.Screen
					name="Home"
					component={HomeStack}
					options={{
						tabBarIcon: ({ color, size }) => (
							<FontAwesome5 name="house-user" size={size} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="Archive"
					component={ArchiveStack}
					options={{
						tabBarIcon: ({ color, size }) => (
							<FontAwesome5 name="user-circle" size={size} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={ProfileStack}
					options={{
						tabBarIcon: ({ color, size }) => (
							<FontAwesome5 name="user-circle" size={size} color={color} />
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}

export default AppNavigator
