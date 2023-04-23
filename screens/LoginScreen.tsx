import { useTheme } from '@shopify/restyle'
import { Auth } from 'firebase/auth'
import React, { FC, useState } from 'react'
import { StatusBar } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Box from '../components/base/Box'
import Button from '../components/base/Button'
import Text from '../components/base/Text'
import { Theme } from '../lib/Theme'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'

interface Props {
	auth: Auth
}

const LoginScreen: FC<Props> = ({ auth }) => {
	const { top, bottom } = useSafeAreaInsets()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')

	const [showSignUp, setShowSignUp] = useState(false)

	const theme = useTheme<Theme>()

	const handleLogin = async () => {
		try {
			await signInWithEmailAndPassword(auth, username, password)
		} catch (error) {
			console.log(error)
		}
	}

	const handleSignUp = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, newPassword).then(
				(cred) => {
					setDoc(doc(db, 'users', cred.user.uid), {
						userId: cred.user.uid,
						firstName,
						lastName,
						phoneNumber,
						email: cred.user.email,
					})
				}
			)
		} catch (error) {
			console.log(error)
		}
	}

	const login = () => {
		return (
			<>
				<Text variant="h1" color="text2" textAlign="center">
					Login
				</Text>
				<Box paddingHorizontal="m">
					<Text variant="body">Brukernavn</Text>
					<TextInput label="username" onChangeText={setUsername} />
					<Text paddingTop="m" variant="body">
						Passord
					</Text>
					<TextInput
						secureTextEntry={true}
						label="password"
						onChangeText={setPassword}
					/>

					<Button title="Login" onPress={handleLogin} />
					<Text paddingTop="m" variant="body">
						Brukernavn testbruker: testbruker@test.com Passord testbruker:
						Test123
					</Text>
				</Box>
				<Box paddingHorizontal="m">
					<Button title="Lag bruker" onPress={() => setShowSignUp(true)} />
				</Box>
			</>
		)
	}
	const signUp = () => {
		return (
			<>
				<Box>
					<Text variant="h1" color="text2" textAlign="center">
						Sign up
					</Text>
					<Box paddingHorizontal="m">
						<Text variant="body">E-post</Text>
						<TextInput label="username" onChangeText={setEmail} />
						<Text variant="body">Fornavn</Text>
						<TextInput label="username" onChangeText={setFirstName} />
						<Text variant="body">Etternavn</Text>
						<TextInput label="username" onChangeText={setLastName} />
						<Text variant="body">Telefonnummer</Text>
						<TextInput label="username" onChangeText={setPhoneNumber} />
						<Text variant="body">Passord</Text>
						<TextInput
							secureTextEntry={true}
							label="password"
							onChangeText={setNewPassword}
						/>
						<Text variant="body">Bekreft passord</Text>
						<TextInput
							secureTextEntry={true}
							label="password"
							onChangeText={setPasswordConfirm}
						/>
						{newPassword !== passwordConfirm ? (
							<Text variant="h2" color="danger">
								Passordene er ikke like
							</Text>
						) : null}
						<Box paddingVertical="m">
							<Button
								title="Lag bruker"
								disabled={newPassword !== passwordConfirm}
								onPress={handleSignUp}
							/>
						</Box>
					</Box>
					<Button title="Tilbake" onPress={() => setShowSignUp(false)} />
				</Box>
			</>
		)
	}

	return (
		<Box
			flex={1}
			bg="bg2"
			style={{
				paddingTop: top + (StatusBar.currentHeight || theme.spacing.m),
				paddingBottom: bottom + theme.spacing.m,
			}}
		>
			{showSignUp ? signUp() : login()}
		</Box>
	)
}

export default LoginScreen
