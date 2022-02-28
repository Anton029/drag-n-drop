import React, { useState } from 'react';
import styles from './App.module.css';
import { Header } from './components/header/header';
import { Board } from './components/board/board';
import { globalStateContext } from './globalState/globalState';
import { SettingsPopup } from './components/settings-popup/settingsPopup';

import defaultBG_1 from './assets/pictures/board_bg_1.jpg'
import defaultBG_2 from './assets/pictures/board_bg_2.jpg'
import defaultBG_3 from './assets/pictures/board_bg_3.jpg'
import defaultBG_4 from './assets/pictures/board_bg_4.jpg'
import defaultBG_5 from './assets/pictures/board_bg_5.jpg'
import defaultBG_6 from './assets/pictures/board_bg_6.jpg'
import defaultBG_7 from './assets/pictures/board_bg_7.jpg'
import defaultBG_8 from './assets/pictures/board_bg_8.jpg'
import defaultBG_9 from './assets/pictures/board_bg_9.jpg'


const bgList = [defaultBG_1, defaultBG_2, defaultBG_3, defaultBG_4, defaultBG_5, defaultBG_6, defaultBG_7, defaultBG_8, defaultBG_9 ]

function App() {

	const [ dragCard, setDragCard ] = useState({})
	const [ dragColumn, setDragColumn ] = useState({})
	const [ columnDropLock, setColumnDropLock ] = useState(false)
	const [ cardDragLock, setCardDragLock ] = useState(false)
	const [ cardDropLock, setCardDropLock ] = useState(false)
	const [ isSettingsPopupOpen, setSettingsPopupOpen ] = useState(false)


	let localStorageBoards = JSON.parse(localStorage.boardsList ? localStorage.boardsList : '[]')
	const [boards, setBoards] = useState(localStorageBoards)
	
	const [ boardBgLink, setBoardBgLink ] = useState(localStorage.bgLink ? localStorage.bgLink : defaultBG_1)

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
							isSettingsPopupOpen: isSettingsPopupOpen,
							setSettingsPopupOpen: setSettingsPopupOpen,
							boardBgLink: boardBgLink,
							setBoardBgLink: setBoardBgLink,
						}

	const bgMod = {
		backgroundImage: `url(${boardBgLink})`
	}

	return (
			<div className="App">
				<globalStateContext.Provider value={globalState}>
					<SettingsPopup 
						bgList={bgList}
					/>
					<div 
						className={styles.boardBG}
						style={bgMod}
					>
						<Header />
						<Board 
							boardList={boards}
						/>
					</div>
				</globalStateContext.Provider>
			</div>
	);
}

export default App;
