import { useTheme } from '@shopify/restyle'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { RestyleColor, Theme } from '../../lib/Theme'
import Text from './Text'

interface Props {
	title: string
	onPress: () => void
	txtColor?: RestyleColor
	backgroundColor?: RestyleColor
	disabled?: boolean
}

export const Button: FC<Props> = ({
	title,
	onPress,
	txtColor = 'text2',
	backgroundColor = 'bg4',
	disabled = false,
}) => {
	const theme = useTheme<Theme>()
	return (
		<TouchableOpacity
			style={{
				backgroundColor: theme.colors[backgroundColor],
				padding: theme.spacing.s,
				borderRadius: 10,
				alignSelf: 'center',
				opacity: disabled ? 0.5 : 1,
			}}
			onPress={onPress}
			disabled={disabled}
		>
			<Text variant="body" color={txtColor} lineHeight={16}>
				{title}
			</Text>
		</TouchableOpacity>
	)
}

export default Button
