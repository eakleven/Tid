import { combineReducers, configureStore } from '@reduxjs/toolkit'
import hoursReducer from './hoursSlice'
import userReducer from './userSlice'

const rootReducer = combineReducers({
	hours: hoursReducer,
	user: userReducer,
})

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
