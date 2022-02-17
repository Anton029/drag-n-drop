import React, { useState } from 'react';
import styles from './App.module.css';
import { Header } from './components/header/header';
import { Board } from './components/board/board';
import { globalStateContext } from './globalState/globalState';

function App() {

	const [ dragCard, setDragCard ] = useState({})
	const [ dragColumn, setDragColumn ] = useState({})
	const [ columnDropLock, setColumnDropLock ] = useState(false)
	const [ cardDragLock, setCardDragLock ] = useState(false)
	const [ cardDropLock, setCardDropLock ] = useState(false)

	let localStorageBoards = JSON.parse(localStorage.boardsList ? localStorage.boardsList : '[]')

	const [boards, setBoards] = useState(localStorageBoards)
	
	const globalState = { 	
							boards: boards, 
							setBoards: setBoards, 
							dragCard: dragCard, 
							setDragCard: setDragCard, 
							dragColumn: dragColumn, 
							setDragColumn: setDragColumn,
							columnDropLock: columnDropLock,
							setColumnDropLock: setColumnDropLock,
							cardDragLock: cardDragLock, 
							setCardDragLock: setCardDragLock,
							cardDropLock: cardDropLock,
							setCardDropLock: setCardDropLock,
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
