import React, { useState } from 'react';
import styles from './App.module.css';
import { Header } from './components/header/header';
import { Board } from './components/board/board';
import { globalStateContext } from './globalState/globalState';

function App() {

	const [boards, setBoards] = useState(
		[
			{
				boardTitle: "Список покупок",
				id: '123123',
				cardsList: [
					{
						title: 'Title',
						description: 'Text',
						id: 'asd_12'
					},
					{
						title: 'Title2',
						description: 'Text2',
						id: 'asd_13'
					},
					{
						title: 'Title3',
						description: 'Text3',
						id: 'asd_14'
					},
				],
			}, 
			{
				boardTitle: "Планы на лето",
				id: 'asd_1w23123',
				cardsList: [
					{
						title: 'Title',
						description: 'Text',
						id: 'asd_122'
					},
					{
						title: 'Title2',
						description: 'Text2',
						id: 'asd_133'
					},
					{
						title: 'Title3',
						description: 'Text3',
						id: 'asd_144'
					},
				],
			}, 
			{
				boardTitle: "Вопросы собеседование",
				id: '12312123',
				cardsList: [
					{
						title: 'Title',
						description: 'Text',
						id: 'asd_12122'
					},
					{
						title: 'Title2',
						description: 'Text2',
						id: 'as11qd_131'
					},
					{
						title: 'Title3',
						description: 'Text3',
						id: 'asd_14112'
					},
					{
						title: 'Title4',
						description: 'Text',
						id: '1231aqsda'
					},
					{
						title: 'Title5',
						description: 'Text2',
						id: 'asd_w131'
					},
					{
						title: 'Title6',
						description: 'Text3',
						id: 'asdqq_141'
					},{
						title: 'Title7',
						description: 'Text',
						id: 'aszaw2'
					},
					{
						title: 'Title8',
						description: 'Text2',
						id: 'as1ad_131'
					},
					{
						title: 'Title9',
						description: 'Text3',
						id: 'asd_11q41'
					},
				],
			},
	]
	)

	return (
		<globalStateContext.Provider value={[boards, setBoards]}>
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
