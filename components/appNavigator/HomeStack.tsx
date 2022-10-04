import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../lib/Theme'
import HomeScreen from '../../screens/Home/HomeScreen'

export type HomeStackParamList = {
	HomeScreen: undefined
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

const HomeStackScreen = () => {
	const theme = useTheme<Theme>()

	return (
		<HomeStack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: theme.colors.bg2 },
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: theme.colors.text1,
				},

				headerTintColor: theme.colors.text1,
				headerShadowVisible: false,
			}}
		>
			<HomeStack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{ headerShown: true }}
			/>
		</HomeStack.Navigator>
	)
}
export default HomeStackScreen
