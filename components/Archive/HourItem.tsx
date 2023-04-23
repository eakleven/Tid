import React, { FC, useState } from 'react'
import Box from '../base/Box'
import Text from '../base/Text'
import { Hours } from '../../types/Hours'
import Collapsible from '../base/Collapsible'
import { TouchableOpacity } from 'react-native'
import dayjs from 'dayjs'
import Button from '../base/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { useUser } from '../../redux/userSlice'
import { deleteHour } from '../../redux/hoursSlice'

interface Props {
	hour: Hours
}

const HourItem: FC<Props> = ({ hour }) => {
	const [open, setOpen] = useState(false)
	const dispatch = useDispatch<AppDispatch>()
	const user = useUser()

	const deleteItem = () => {
		if (!user) return null
		dispatch(
			deleteHour({
				hourId: hour.hoursId,
				projectId: hour.projectId,
				userId: user?.userId.toString(),
			})
		)
	}

	return (
		<TouchableOpacity activeOpacity={0.6} onPress={() => setOpen(!open)}>
			<Box
				key={hour.hoursId}
				padding="s"
				justifyContent="space-between"
				backgroundColor="bg3"
				marginBottom="s"
				borderRadius={5}
			>
				<Box flexDirection="row" justifyContent="space-between">
					<Text variant="h3" color="text2">
						{dayjs(hour.date).format('DD.MM.YY')}
					</Text>
					<Text variant="h3" color="text2">
						{hour.hours} timer
					</Text>
					<Text variant="h3" color="text2">
						{parseInt(hour.salary) * parseInt(hour.hours)},-
					</Text>
				</Box>
				<Collapsible open={open}>
					<>
						<Text variant="h3" color="text2">
							{hour.desc}
						</Text>
						<Button title="Slett" onPress={deleteItem} />
					</>
				</Collapsible>
			</Box>
		</TouchableOpacity>
	)
}

export default HourItem
