import React, { useContext } from 'react'
import styles from './style.module.css'

import { globalStateContext } from '../../../globalState/globalState'

interface Allprops {
	bgLink: string;
}

export const BGcard = (props: Allprops) => {

	const globalState = useContext(globalStateContext)
	const { setBoardBgLink } = globalState

	const bgStyle = {
		backgroundImage: `url(${props.bgLink})`,

	}

	const clickHandler = () => {
		setBoardBgLink(props.bgLink)
		localStorage.bgLink = props.bgLink
	}

	return (
		<div
			style={bgStyle}
			className={styles.imgWrapper}
			onClick={() => clickHandler()}
		>
			
		</div>
	)
}