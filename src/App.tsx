import React, { useState } from 'react';
import styles from './App.module.css';
import { Header } from './components/header/header';
import { Board } from './components/board/board';
import { globalStateContext } from './globalState/globalState';

function App() {

	const [dragCard, setDragCard] = useState({})
	const [dragColumn, setDragColumn] = useState({})
	const [columnDragLock, setColumnDragLock] = useState(false)
	const [ cardDragLock, setCardDragLock ] = useState(false)

	let localStorageBoards = JSON.parse(localStorage.boardsList)

	// localStorageBoards = localStorageBoards.map((e, i) => {
	// 	return {...e, ...{orderNumber: i}}
	// })

	// localStorage.boardsList = JSON.stringify(localStorageBoards)
	
	// console.log(localStorageBoards)

	const [boards, setBoards] = useState(localStorageBoards)

	const globalState = { 	
							boards: boards, 
							setBoards: setBoards, 
							dragCard: dragCard, 
							setDragCard: setDragCard, 
							dragColumn: dragColumn, 
							setDragColumn: setDragColumn,
							columnDragLock: columnDragLock,
							setColumnDragLock: setColumnDragLock,
							cardDragLock: cardDragLock, 
							setCardDragLock: setCardDragLock
						}

	return (
		<globalStateContext.Provider value={globalState}>
			<div className="App">
				<div className={styles.boardBG}>
					<Header />
					<Board 
						boardList={boards}
					/>
				</div>
			</div>
		</globalStateContext.Provider>
	);
}

export default App;
