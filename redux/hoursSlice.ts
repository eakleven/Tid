import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { db } from '../config/firebase'
import { RootState } from './store'

interface Projects {
	projectId: string
	projectName: string
	projectOwner: string
	projectWorkers: string[]
}

interface hoursState {
	projects: Projects[] | null
}

const initialState: hoursState = {
	projects: null,
}

const namespace = 'hours'

interface addProject {
	projectName: string
	projectOwner: string
	projectMembers: string[]
}

export const addProject = createAsyncThunk(
	`${namespace}/addProject`,
	async (
		{ projectName, projectMembers, projectOwner }: addProject,
		{ dispatch }
	) => {
		try {
			await addDoc(collection(db, 'projects'), {
				projectName,
				projectOwner,
				projectMembers,
			})
		} catch (e) {
			console.log(e)
		} finally {
			dispatch(getProjects())
		}
	}
)

export const getProjects = createAsyncThunk(
	`${namespace}/getProjects`,
	async () => {
		try {
			const docSnap = await getDoc(doc(db, 'projects'))
			if (docSnap.exists()) {
				return docSnap.data() as Projects[]
			}
		} catch (e) {
			console.log(e)
		}
	}
)

export const hoursSlice = createSlice({
	name: 'hours',
	initialState: initialState,

	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProjects.pending, (state, { payload }) => {
			if (payload) {
				state.projects = payload
			}
		})
	},
})

export const useProjects = () =>
	useSelector((state: RootState) => state.hours.projects)

export default hoursSlice.reducer
