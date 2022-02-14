import React, { useContext } from 'react';
import styles from './style.module.css';
import { getRandomID } from '../../utils/randomID';

import { globalStateContext } from '../../globalState/globalState';

export const Header = () => {

	const globalState = useContext(globalStateContext)

	const { boards, setBoards } = globalState

	const addBoardHandler = () => {
		let newBoards = [...boards]

		newBoards.splice(0, 0, {
			boardTitle: '',
			boardID: getRandomID(5, 10),
			cardsList: [],
			editMod: true
		})

		setBoards(newBoards)
	}

	return (
		<div className={styles.headerWrapper}>
			<div className={styles.logoWrapper}>
				<div className={styles.logo}></div>
				<div className={styles.logoTitle}>React boardsSpace</div>
			</div>
			<div 
				className={styles.addBoardButtonWrapper}
				onClick={() => addBoardHandler()}
			>
				<p>Добавить карточку</p>
				<div className={styles.addBoardButton}>
					+
				</div>
			</div>
		</div>
    );
};