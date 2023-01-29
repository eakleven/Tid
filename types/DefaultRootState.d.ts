import 'react-redux'

import { RootState } from '../redux/store'

declare module 'react-redux' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultRootState extends RootState {}
}
