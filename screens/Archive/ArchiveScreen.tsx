import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import Box from '../../components/base/Box'
import Button from '../../components/base/Button'
import Text from '../../components/base/Text'
import { auth, db } from '../../config/firebase'

const ArchiveScreen = () => {
	const [projectName, setProjectName] = useState('')
	const user = auth.currentUser

	const onPress = async () => {
		if (!user) return null
		try {
			await addDoc(collection(db, 'projects'), {
				projectName,
				projectOwner: user.uid,
			})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Box flex={1} bg="bg1">
			<Box paddingHorizontal="m">
				<Text variant="h1" color="text1">
					Prosjektnavn: {projectName}
				</Text>
				<TextInput placeholder="Prosjektnavn" onChangeText={setProjectName} />
				<Button title="Legg til" onPress={onPress} />
			</Box>
		</Box>
	)
}
export default ArchiveScreen
