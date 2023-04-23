import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
} from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { db } from '../config/firebase'
import { Project } from '../types/Project'
import { RootState } from './store'
import { Hours } from '../types/Hours'

interface hoursState {
	projects: Project[] | null
	loading: boolean
	hours: Hours[] | null
}

const initialState: hoursState = {
	projects: null,
	loading: false,
	hours: null,
}

const namespace = 'hours'

interface addProject {
	projectName: string
	projectOwner: string
}

export const addProject = createAsyncThunk(
	`${namespace}/addProject`,
	async ({ projectName, projectOwner }: addProject, { dispatch }) => {
		try {
			const docRef = doc(collection(db, 'projects'))
			await setDoc(docRef, {
				projectId: docRef.id,
				projectName,
				projectOwner,
			})
			const userRef = doc(db, 'projects', docRef.id, 'users', projectOwner)
			await setDoc(userRef, {
				userId: projectOwner,
				salary: 120,
			})
		} catch (e) {
			console.log('test')
		} finally {
			dispatch(getProjects())
		}
	}
)

interface addHours {
	projectId: string
	userId: string
	hours: string
	salary: string
	desc: string
	date: string
}

export const addHours = createAsyncThunk(
	`${namespace}/addHours`,
	async (
		{ projectId, userId, hours, salary, date, desc }: addHours,
		{ dispatch }
	) => {
		try {
			const docRef = doc(
				collection(db, 'projects', projectId, 'users', userId, 'hours')
			)
			await setDoc(docRef, {
				hoursId: docRef.id,
				projectId,
				userId,
				hours,
				salary,
				desc,
				date,
			})
		} catch (e) {
			console.log('test')
		} finally {
			dispatch(getHours({ projectId, userId }))
		}
	}
)

export const getHours = createAsyncThunk(
	`${namespace}/getHours`,
	async ({ projectId, userId }: { projectId: string; userId: string }) => {
		try {
			const docSnap = await getDocs(
				collection(db, 'projects', projectId, 'users', userId, 'hours')
			)
			if (docSnap) {
				const hours: Hours[] = []
				docSnap.forEach((doc) => {
					hours.push(doc.data() as Hours)
				})
				return hours
			}
		} catch (e) {
			console.log(e)
		}
	}
)

interface deleteHour {
	userId: string
	projectId: string
	hourId: string
}

export const deleteHour = createAsyncThunk(
	`${namespace}/deleteHour`,
	async ({ userId, projectId, hourId }: deleteHour, { dispatch }) => {
		try {
			await deleteDoc(
				doc(db, 'projects', projectId, 'users', userId, 'hours', hourId)
			)
		} catch (e) {
			console.log('test')
		} finally {
			dispatch(getHours({ projectId, userId }))
		}
	}
)
interface deleteProject {
	id: string
}

export const deleteProject = createAsyncThunk(
	`${namespace}/deleteProject`,
	async ({ id }: deleteProject, { dispatch }) => {
		try {
			await deleteDoc(doc(db, 'projects', id))
		} catch (e) {
			console.log('test')
		} finally {
			dispatch(getProjects())
		}
	}
)

export const getProjects = createAsyncThunk(
	`${namespace}/getProjects`,
	async () => {
		try {
			console.log('getter')

			const docSnap = await getDocs(collection(db, 'projects'))
			if (docSnap) {
				const projects: Project[] = []
				docSnap.forEach((doc) => {
					projects.push(doc.data() as Project)
				})
				return projects
			}
		} catch (e) {
			console.log(e)
		}
	}
)

interface addProjectWorker {
	projectId: string
	workerEmail: string
	salary: number
}
export const addProjectWorker = createAsyncThunk(
	`${namespace}/addProjectWorker`,
	async (
		{ projectId, workerEmail, salary }: addProjectWorker,
		{ dispatch }
	) => {
		try {
			await addDoc(collection(db, 'projects'), {
				projectId,
				workerEmail,
				salary,
			})
		} catch (e) {
			console.log(e)
		} finally {
			dispatch(getProjects())
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
				state.loading = true
			}
		})
		builder.addCase(getProjects.fulfilled, (state, { payload }) => {
			if (payload) {
				state.projects = payload
				state.loading = false
			}
		})
		builder.addCase(getHours.fulfilled, (state, { payload }) => {
			if (payload) {
				state.hours = payload
				state.loading = false
			}
		})
		builder.addCase(getHours.pending, (state, { payload }) => {
			state.loading = true
		})
	},
})

export const useProjects = () =>
	useSelector((state: RootState) => state.hours.projects)
export const useHours = () =>
	useSelector((state: RootState) => state.hours.hours)

export default hoursSlice.reducer
