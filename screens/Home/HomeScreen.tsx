import React from 'react'
import { StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Box from '../../components/base/Box'
import Text from '../../components/base/Text'

const HomeScreen = () => {
	const insets = useSafeAreaInsets()

	return (
		<Box
			flex={1}
			bg="bg1"
			style={{
				paddingTop: insets.top + (StatusBar.currentHeight || 0),
			}}
		>
			<Text variant="h1" color="text2">
				Hei
			</Text>
		</Box>
	)
}
export default HomeScreen
