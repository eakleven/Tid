import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { doc, getDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { db } from '../config/firebase'
import { RootState } from './store'

interface User {
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	userId: number
}

interface userState {
	user: User | null
}

const initialState: userState = {
	user: null,
}

export const getUser = createAsyncThunk(
	'user/getUser',
	async (userId: string) => {
		try {
			const docSnap = await getDoc(doc(db, 'users', userId))
			if (docSnap.exists()) {
				return docSnap.data() as User
			}
		} catch (e) {
			console.log(e)
		}
	}
)

const namespace = 'user'

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,

	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUser.fulfilled, (state, { payload }) => {
			if (payload) {
				state.user = payload
			}
		})
	},
})

export const { setUser } = userSlice.actions

export const useUser = () => useSelector((state: RootState) => state.user.user)

export default userSlice.reducer
