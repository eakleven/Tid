import {
	NativeStackNavigationProp,
	createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../lib/Theme'
import AddHoursScreen, {
	AddHoursProps,
} from '../../screens/Archive/AddHoursScreen'
import ArchiveScreen from '../../screens/Archive/ArchiveScreen'
import ProjectScreen from '../../screens/Archive/ProjectScreen'
import { CompositeNavigationProp } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RootTabParamList } from '../../components/appNavigator'

export type ArchiveStackParamList = {
	ArchiveScreen: undefined
	ProjectScreen: undefined
	AddHoursScreen: AddHoursProps
}

export type ArchiveNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<RootTabParamList, 'Archive'>,
	NativeStackNavigationProp<ArchiveStackParamList>
>

const ArchiveStack = createNativeStackNavigator<ArchiveStackParamList>()

const ArchiveStackScreen = () => {
	const theme = useTheme<Theme>()

	return (
		<ArchiveStack.Navigator
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
			<ArchiveStack.Screen
				name="ArchiveScreen"
				component={ArchiveScreen}
				options={{ headerShown: true, title: 'Archive' }}
			/>
			<ArchiveStack.Screen
				name="ProjectScreen"
				component={ProjectScreen}
				options={{ headerShown: true }}
			/>
			<ArchiveStack.Screen
				name="AddHoursScreen"
				component={AddHoursScreen}
				options={{ headerShown: true, title: 'Add hours' }}
			/>
		</ArchiveStack.Navigator>
	)
}
export default ArchiveStackScreen
