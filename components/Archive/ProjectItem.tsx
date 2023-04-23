import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import Box from '../base/Box'
import Text from '../base/Text'
import { ArchiveNavigationProp } from '../appNavigator/ArchiveStack'
import { Project } from '../../types/Project'
import Button from '../base/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { deleteProject } from '../../redux/hoursSlice'

interface Props {
	navigation: ArchiveNavigationProp
	project: Project
}

const ProjectItem: FC<Props> = ({ navigation, project }) => {
	const dispatch = useDispatch<AppDispatch>()

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('AddHoursScreen', { project })}
			key={project.projectId}
		>
			<Box
				bg="bg2"
				padding="s"
				paddingHorizontal="m"
				marginBottom="s"
				borderRadius={10}
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Text
					marginLeft="s"
					variant="body"
					color="text2"
					key={project.projectId}
				>
					{project.projectName}
				</Text>
				<Button
					title={'Slett'}
					onPress={() => dispatch(deleteProject({ id: project.projectId }))}
				/>
			</Box>
		</TouchableOpacity>
	)
}

export default ProjectItem
