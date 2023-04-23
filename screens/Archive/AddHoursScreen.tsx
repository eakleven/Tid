import React, { FC, useEffect, useMemo, useState } from 'react'
import Box from '../../components/base/Box'
import Text from '../../components/base/Text'
import { Project } from '../../types/Project'
import { TextInput } from 'react-native-paper'
import Button from '../../components/base/Button'
import { useDispatch } from 'react-redux'
import { addHours, getHours, useHours } from '../../redux/hoursSlice'
import { auth } from '../../config/firebase'
import { AppDispatch } from '../../redux/store'
import { ScrollView } from 'react-native'
import HourItem from '../../components/Archive/HourItem'
import ShowInfo from '../../components/base/ShowInfo'
import { ArchiveNavigationProp } from '../../components/appNavigator/ArchiveStack'

export interface AddHoursProps {
	project: Project
}

interface Props {
	navigation: ArchiveNavigationProp
	route: {
		params: AddHoursProps
	}
}

const AddHoursScreen: FC<Props> = ({ route: { params } }) => {
	const project = params.project
	const dispatch = useDispatch<AppDispatch>()
	const user = auth.currentUser
	const projectHours = useHours()

	const [hours, setHours] = useState('')
	const [desc, setDesc] = useState('')
	const [date, setDate] = useState(new Date())

	const [open, setOpen] = useState(false)

	const totalHours = useMemo(() => {
		if (projectHours) {
			return projectHours.reduce((acc, curr) => {
				return acc + parseInt(curr.hours)
			}, 0)
		} else return 0
	}, [projectHours])

	const totalSalary = useMemo(() => {
		if (!projectHours) return 0
		let salary = 0
		for (const hour of projectHours) {
			salary += parseInt(hour.hours) * parseInt(hour.salary)
		}
		return salary
	}, [projectHours])

	useEffect(() => {
		if (!hours && user && project) {
			dispatch(
				getHours({
					projectId: project?.projectId,
					userId: user?.uid,
				})
			)
		}
	}, [hours, user, project, dispatch])

	const submit = () => {
		console.log('Lagrer')
		if (user && project)
			dispatch(
				addHours({
					projectId: project.projectId,
					userId: user?.uid,
					date: date.toISOString(),
					hours: hours,
					desc: desc,
					salary: '120',
				})
			)
		setHours('')
		setDesc('')
	}

	return (
		<Box flex={1} paddingHorizontal="s">
			<ScrollView>
				<Text variant="h1" textAlign="center" paddingTop="m">
					{params.project?.projectName}
				</Text>
				<Box flexDirection="row" paddingTop="m" paddingBottom="m">
					<Box flex={0.5} paddingRight="s">
						<TextInput
							mode="outlined"
							value={date.toLocaleString()}
							disabled={true}
						/>
					</Box>
					<Box flex={0.5}>
						<TextInput
							onChangeText={setHours}
							value={hours}
							label="Timer"
							mode="outlined"
							keyboardType="numeric"
						/>
					</Box>
				</Box>
				<TextInput
					onChangeText={setDesc}
					value={desc}
					label="Beskrivelse"
					mode="outlined"
				/>
				<Box paddingVertical="m">
					<Button title={'Lagre'} onPress={submit} />
				</Box>
				{projectHours && (
					<Box>
						<ShowInfo desc="Totalt timer:" value={totalHours} />
						<ShowInfo desc="Totalt lønn:" value={totalSalary} />
					</Box>
				)}

				{projectHours && projectHours.map((h) => <HourItem hour={h} />)}
			</ScrollView>
		</Box>
	)
}

export default AddHoursScreen
