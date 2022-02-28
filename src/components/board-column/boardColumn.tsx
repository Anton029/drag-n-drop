import React, { useContext, useState } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import { globalStateContext } from '../../globalState/globalState';
import { BoardItem } from '../board-item/boardItem';

import { getRandomID } from '../../utils/randomID';

interface AllProps {
	boardTitle: string,
	boardID: string,
	cardsList: [
		{   title: string,
			description: string,
			id: string,
			editMod: boolean
		}
	],
	editMod: boolean
}

const dragOverHandler = (e) => {
    e.preventDefault()
    // e.target.classList.add(`${styles.columnDragOver}`)
}

const dragLeaveHandler = (e) => {
    e.preventDefault()
    // e.target.classList.remove(`${styles.columnDragOver}`)
}

export const BoardColumn = (props: AllProps) => {

	const globalState = useContext(globalStateContext)

	const { boards, setBoards, setDragColumn, dragColumn, columnDropLock, cardDragLock, setCardDropLock } = globalState

	const dragStartHandler = () => {
		if(!cardDragLock) {
			setDragColumn(props)
			setCardDropLock(true)
			console.log(boards)
		}
	}

	const dropHandler = (e, card) => {
		setCardDropLock(false)
		if(!columnDropLock && card.boardID !== dragColumn.boardID){
			
			let newBoards = [...boards]
			
			newBoards = newBoards.filter(e => e.boardID !== dragColumn.boardID)
			
			for(let i = 0; i < newBoards.length; i++) {
				if(newBoards[i].boardID == card.boardID) {
					newBoards.splice(i, 0, dragColumn)
					break
				}
			}

			console.log(newBoards)

			setBoards(newBoards)
			localStorage.setItem('boardsList', JSON.stringify(newBoards))
		}
	}

	const addEmptyCardHandler = () => {
		let newBoards = [...boards]

		newBoards.forEach(board => {
			if(board.boardID == props.boardID){
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

		setBoards(newBoards)
	}

	const [ optionsPopupOpen, setOptionsPopupOpen ] = useState(false)

	const settingsPopupMod = optionsPopupOpen ? `${styles.open}` : ''

	const [ boardEditMod, setBoardEditMod ] = useState(props.editMod)

	const optionsButtonHandler = () => {
		setOptionsPopupOpen(!optionsPopupOpen)
	}

	const pointerMod = cardDragLock || columnDropLock ? `${styles.noPointerEvents}`: '';

	const [ titleInput, setTitleInput ] = useState(props.boardTitle)

	const [ placeholderError, setPlaceholderError ] = useState(false)
	const placeholderMod = placeholderError ? `${styles.placeholderError}` : ''


	const boardTitleInputHandler = (value) => {
        setTitleInput(value)
        if(titleInput != '') {
            setPlaceholderError(false)
        }
    }

	const acceptEditBoardHandler = () => {

		if(titleInput != '' && titleInput != ' ') {
			let newBoards = [...boards]

            newBoards = newBoards.map(board => {
                if(board.boardID == props.boardID){
					return {...board, ...{boardTitle: titleInput, editMod: false}}
                }
                else return board
            })

            setBoards(newBoards)
            localStorage.setItem('boardsList', JSON.stringify(newBoards))
			
			setBoardEditMod(false)
			setOptionsPopupOpen(false)
		} 
		else setPlaceholderError(true)
    }

	const boardEditModHandler = () => {
		setBoardEditMod(!boardEditMod)
		setOptionsPopupOpen(false)
	}

	const deleteBoardHanlder = () => {
		let newBoards = [...boards]

		newBoards = newBoards.filter(board => board.boardID != props.boardID)
		setBoards(newBoards)
		localStorage.setItem('boardsList', JSON.stringify(newBoards))
	}

	return (
		<div 
			className={styles.columnWrapper}
			draggable={true}
			onDragStart={() => dragStartHandler()}
			onDragEnd={() => setCardDropLock(false)}
			onDrop={e => dropHandler(e, props)}
			onDragOver={e => dragOverHandler(e)}
			onDragLeave={e => dragLeaveHandler(e)}
		>
			<div className={styles.columnTitleWrapper}>
				{!boardEditMod ? 
					<div className={styles.columnTitle}>
						{props.boardTitle}
					</div>
					:
					<div className={styles.columnTitleInputWrapper}>
						<input
							className={placeholderMod}
							type={'text'} 
							value={titleInput}
							placeholder={'Введите заголовок'}
							onChange={(e) => boardTitleInputHandler(e.target.value)}
						/>
					</div>
				}
				{!boardEditMod &&
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
				}
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
