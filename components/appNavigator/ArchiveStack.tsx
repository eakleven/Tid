import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../lib/Theme'
import ArchiveScreen from '../../screens/Archive/ArchiveScreen'

export type ArchiveStackParamList = {
	ArchiveScreen: undefined
}

const ArchiveStack = createNativeStackNavigator<ArchiveStackParamList>()

const ArchiveStackScreen = () => {
	const theme = useTheme<Theme>()

	return (
		<ArchiveStack.Navigator
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
			<ArchiveStack.Screen
				name="ArchiveScreen"
				component={ArchiveScreen}
				options={{ headerShown: true }}
			/>
		</ArchiveStack.Navigator>
	)
}
export default ArchiveStackScreen
