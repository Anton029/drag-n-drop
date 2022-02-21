import React, { useContext, useState } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import { globalStateContext } from '../../globalState/globalState';
import { BoardItem } from '../board-item/boardItem';

import { getRandomID } from '../../utils/randomID';

interface AllProps {
	title: string,
	boardID: string,
	cardsList: [
		{   title: string,
			description: string,
			id: string,
			editMod: boolean
		}
	],
	orderNumber: number,
	editMod: boolean
}

export const BoardColumn = (props: AllProps) => {

	const globalState = useContext(globalStateContext)

	const { boards, setBoards, setDragColumn, dragColumn, columnDragLock, setColumnDragLock, cardDragLock, setCardDragLock } = globalState

	const dragStartHandler = () => {
		setDragColumn(props)
	}

	const dropHandler = () => {
		if(!columnDragLock){
			let newBoards = [...boards]

			const oldOrderNumber = dragColumn.orderNumber
			const newOrderNumber = props.orderNumber
			
			// newBoards = newBoards.map(e => {
			// 	if(e.orderNumber == oldOrderNumber) {
			// 		return {...e, ...{orderNumber: newOrderNumber}}
			// 	}
			// 	else if(e.orderNumber == newOrderNumber){
			// 		return {...e, ...{orderNumber: oldOrderNumber}}
			// 	}
			// 	else return e
			// })
	
			// for(let i = 0; i < newBoards.length; i++) {
			// 	if(newBoards[i].id == props.boardID){
			// 		// newBoards.splice(i, 0, props) 
			// 		// console.log(props)
			// 	}
			// }

			// newBoards.forEach((board, i) => {
			// 	if(board.id === dragColumn.boardID){
			// 		// console.log(i)
			// 		newBoards.splice(i, 1)
			// 	}
			// })

			newBoards = newBoards.filter(e => e.id != dragColumn.boardID)

			// newBoards.forEach((board, i) => {
			// 	if(board.id === props.boardID){
			// 		console.log(i)
			// 		// console.log(dragColumn)
			// 		newBoards.splice(i, 0, dragColumn)
			// 	}
			// })

			for(let i = 0; i < newBoards.length; i++){
				if(newBoards[i].id === props.boardID) {
					// newBoards.splice(i, 0, {...dragColumn})
					console.log(i)
					break
				}
			}

			console.log(newBoards)
			setBoards(newBoards)

			// newBoards = newBoards.sort((a, b) => a.orderNumber - b.orderNumber)
			// localStorage.setItem('boardsList', JSON.stringify(newBoards))
		}
	}

	const dragOverHandler = (e) => {
		e.preventDefault()
	}

	const addEmptyCardHandler = () => {
		let newBoards = [...boards]

		newBoards.forEach(board => {
			if(board.id == props.boardID){
				board.cardsList.push(
					{
						title: '',
						description: '',
						id: getRandomID(5, 10),
						editMod: true
					}
				)
			}
		})

		// console.log(newBoards)
		setBoards(newBoards)
	}

	const [ optionsPopupOpen, setOptionsPopupOpen ] = useState(false)

	const settingsPopupMod = optionsPopupOpen ? `${styles.open}` : ''

	const [ boardEditMod, setBoardEditMod ] = useState(props.editMod)

	const optionsButtonHandler = () => {
		setOptionsPopupOpen(!optionsPopupOpen)
	}

	const pointerMod = cardDragLock || columnDragLock ? `${styles.noPointerEvents}`: '';

	const [ titleInput, setTitleInput ] = useState(props.title)

	const [ placeholderError, setPlaceholderError ] = useState(false)

	const boardTitleInputHandler = (value) => {
        setTitleInput(value)
        // if(titleInput != '') {
        //     setPlaceholderError(false)
        // }
    }

	const acceptEditBoardHandler = () => {

		if(titleInput != '' && titleInput != ' ') {
			let newBoards = [...boards]

            newBoards = newBoards.map(board => {
                if(board.id == props.boardID){
					return {...board, ...{boardTitle: titleInput, editMod: false}}
                }
                return board
            })

            // console.log(newBoards)
            setBoards(newBoards)
            localStorage.setItem('boardsList', JSON.stringify(newBoards))
			
			setBoardEditMod(!boardEditMod)
			setOptionsPopupOpen(false)
		}
    }

	const boardEditModHandler = () => {
		setBoardEditMod(!boardEditMod)
		setOptionsPopupOpen(false)
	}

	const deleteBoardHanlder = () => {
		let newBoards = [...boards]

		newBoards = newBoards.filter(board => board.id != props.boardID)
		setBoards(newBoards)
		localStorage.setItem('boardsList', JSON.stringify(newBoards))
	}

	return (
		<div 
			className={styles.columnWrapper}
			draggable={true}
			onDragStart={() => dragStartHandler()}
			onDrop={e => dropHandler()}
			onDragOver={e => dragOverHandler(e)}
		>
			<div className={styles.columnTitleWrapper}>
				{!boardEditMod ? 
					<div className={styles.columnTitle}>
						{props.title}
					</div>
					:
					<div className={styles.columnTitleInputWrapper}>
						<input 
							type={'text'} 
							value={titleInput} 
							placeholder={'Введите заголовок'}
							onChange={(e) => boardTitleInputHandler(e.target.value)}
						/>
					</div>
				}
				<div
						className={classNames(styles.optionsButton, pointerMod)}
						draggable={false}
					>
						<div 
							className={classNames(styles.settingsPopup, settingsPopupMod)}
						>
							<div 
								className={styles.editIcon}
								onClick={() => boardEditModHandler()}
							>
								&#9998;
							</div>
							<div 
								className={styles.deleteIcon}
								onClick={() => deleteBoardHanlder()}
							>
								&#10006;
							</div>
						</div>
						<div
							className={styles.settingsIcon}
							draggable={false}
							onDrop={e => false}
							onClick={() => optionsButtonHandler()}
						>
							...
						</div>
					</div>
				{boardEditMod &&
					<div 
						className={classNames(styles.acceptEdit, pointerMod)}
						onClick={() => acceptEditBoardHandler()}
					>
						&#10004;
					</div>
                }
			</div>
			<div className={styles.columnBodyWrapper}>
				<div className={styles.columnBody}>
					{props.cardsList.map(item => 
						<BoardItem 
							title={item.title}
							description={item.description}
							parentBoardID={props.boardID}
							id={item.id}
							key={item.id}
							editMod={item.editMod}
						/>
					)}
					{props.cardsList.length === Number(0) &&
						<BoardItem 
							title={'Пока что колонка пустая'}
							description={''}
							parentBoardID={props.boardID}
							id={''}
							key={''}
							editMod={false}
							empty
						/>
					}
				</div>
			</div>
			<div 
				className={styles.addCardButton}
				onClick={() => addEmptyCardHandler()}
			>
				+ Добавить карточку
			</div>
		</div>
	);
};
