import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
	CompositeNavigationProp,
	useNavigation,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { RootTabParamList } from '../../components/appNavigator'
import { ArchiveStackParamList } from '../../components/appNavigator/ArchiveStack'
import Box from '../../components/base/Box'
import Button from '../../components/base/Button'
import Text from '../../components/base/Text'
import { auth } from '../../config/firebase'
import { addProject, getProjects, useProjects } from '../../redux/hoursSlice'
import { AppDispatch } from '../../redux/store'
import ProjectItem from '../../components/Archive/ProjectItem'

type NavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<RootTabParamList, 'Archive'>,
	NativeStackNavigationProp<ArchiveStackParamList>
>

const ArchiveScreen = () => {
	const [projectName, setProjectName] = useState('')
	const dispatch = useDispatch<AppDispatch>()
	const user = auth.currentUser
	const projects = useProjects()
	const navigation = useNavigation<NavigationProp>()

	useEffect(() => {
		if (!projects || projects.length === 0) {
			dispatch(getProjects())
		}
	})

	const onPress = async () => {
		if (!user) return null
		try {
			dispatch(addProject({ projectName, projectOwner: user.uid }))
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Box flex={1} bg="bg1">
			<Box paddingHorizontal="m">
				<Text variant="h1" color="text1">
					Legg til nytt prosjekt
				</Text>
				<Box paddingVertical={'s'}>
					<TextInput placeholder="Prosjektnavn" onChangeText={setProjectName} />
				</Box>

				<Button title="Legg til" onPress={onPress} />
				{projects && (
					<Box marginTop="s">
						{projects.map((project) => (
							<ProjectItem project={project} navigation={navigation} />
						))}
					</Box>
				)}
			</Box>
		</Box>
	)
}
export default ArchiveScreen
