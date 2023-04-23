import React, { FC } from 'react'
import Box from './Box'

interface Props {
	open: boolean
	children: JSX.Element
}

const Collapsible: FC<Props> = ({ children, open }) => {
	return <>{open && <Box>{children}</Box>}</>
}

export default Collapsible
