import { FC } from 'react'
import Box from './Box'
import Text from './Text'

interface Props {
	desc: string
	value: string | number
}

const ShowInfo: FC<Props> = ({ desc, value }) => {
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

export default ShowInfo
