import React, { useContext } from 'react';
import styles from './style.module.css';
import { getRandomID } from '../../utils/randomID';

import { globalStateContext } from '../../globalState/globalState';

export const Header = () => {

	const globalState = useContext(globalStateContext)

	const { boards, setBoards } = globalState

	const addBoardHandler = () => {
		let newBoards = [...boards]

		let maxOrderNumber = 0

		newBoards.forEach(e => {
			if(e.orderNumber > maxOrderNumber) {
				maxOrderNumber = e.orderNumber
			}
		})

		maxOrderNumber += 1

		newBoards.splice(0, 0, 
			{
			boardTitle: '',
			id: getRandomID(5, 10),
			orderNumber: maxOrderNumber,
			cardsList: [],
			editMod: true
			}
		)

		console.log(newBoards)
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
				<p>Добавить колонку</p>
				<div className={styles.addBoardButton}>
					+
				</div>
			</div>
		</div>
    );
};