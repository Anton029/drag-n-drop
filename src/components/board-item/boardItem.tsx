import React, { useContext, useState } from 'react';
import styles from './style.module.css';
import classNames from 'classnames';
import { globalStateContext } from '../../globalState/globalState';

interface AllProps {
    title: string,
    description?: string,
    parentBoardID: string,
    id: string,
    empty?,
    editMod: boolean
}

const dragOverHandler = (e) => {
    e.preventDefault()
    e.target.classList.add(`${styles.itemDragOver}`)
}

const dragLeaveHandler = (e) => {
    e.preventDefault()
    e.target.classList.remove(`${styles.itemDragOver}`)
}

export const BoardItem = (props: AllProps) => {

    const globalState = useContext(globalStateContext)
    
    const { boards, setBoards, dragCard, setDragCard, cardDragLock, setCardDragLock, setColumnDragLock } = globalState

    const dragStartHandler = (card) => {
        setDragCard(card)
        setCardDragLock(true)
    }

    const dragEndHandler = () => {
        console.log('end drag')
        setCardDragLock(false)
    }

    const dropHandler = (e, card) => {

        e.target.classList.remove(`${styles.itemDragOver}`)
        setCardDragLock(false)

        if(card.id != dragCard.id){

            let newBoards = [...boards]

            newBoards = newBoards.map(e => {
                return {...e, ...{cardsList: e.cardsList.filter(item => item.id != dragCard.id)}}
            })
    
            newBoards.forEach(e => {
                if(e.id == props.parentBoardID){
                    let boardList = e.cardsList

                    for(let i = 0; i < boardList.length; i++){
                        if(boardList[i].id == card.id) {
                            boardList.splice(i + 1, 0, dragCard)
                            break
                        }
                    }
                }
            })

            newBoards.push()

            setBoards(newBoards)
            localStorage.setItem('boardsList', JSON.stringify(newBoards))
        }
    }

    const emptyDropHandler = (e) => {
        
        setCardDragLock(false)

        let newBoards = [...boards]

        newBoards = newBoards.map(e => {
            return {...e, ...{cardsList: e.cardsList.filter(item => item.id != dragCard.id)}}
        })

        newBoards.forEach(e => {
            if(e.id == props.parentBoardID){
                e.cardsList.push(dragCard)
            }
        })

        setBoards(newBoards)
    }

    const ColumnDragLockHandler = (e) => {
        setColumnDragLock(true)
    }

    const ColumnDragUnlockHandler = (e) => {
        setColumnDragLock(false)
    }

    const deleteCardHanlder = () => {
        let newBoards = [...boards]


        newBoards = newBoards.map(e => {
            return {...e, ...{cardsList: e.cardsList.filter(item => item.id != props.id)}}
        })

        setBoards(newBoards)
        localStorage.setItem('boardsList', JSON.stringify(newBoards))
    }

    const [ cardEditMod, setCardEditMod ] = useState(props.editMod)
    const [ optionsPopupOpen, setOptionsPopupOpen ] = useState(false)

    const optionsButtonHandler = () => {
        setOptionsPopupOpen(!optionsPopupOpen)
    }

    const cardEditModHandler = () => {

        // let newBoards = [...boards]

        // newBoards = newBoards.map(board => {
        //     if(board.id == props.parentBoardID){
        //         board.cardsList = board.cardsList.map(e => 
        //             {
        //                 if(e.id == props.id) {
        //                     return {...e, ...{editMod: !cardEditMod}}
        //                 }
        //                 else return e
        //             }
        //         )
        //     }
        //     return board
        // })

        // console.log(newBoards)

        // localStorage.setItem('boardsList', JSON.stringify(newBoards))

        
        setCardEditMod(!cardEditMod)
        setOptionsPopupOpen(false)
    }

    const settingsPopupMod = optionsPopupOpen ? `${styles.open}` : ''
    const pointerMod = cardDragLock ? `${styles.noPointerEvents}`: '';

    const [ titleInput, setTitleInput ] = useState(props.title)
    const [ descriptionInput, setDescriptionInput ] = useState(props.description)

    const [ placeholderError, setPlaceholderError ] = useState(false)

    const placeholderMod = placeholderError ? `${styles.redPlaceHolder}` : ''

    const cardTitleInputHandler = (value) => {
        setTitleInput(value)
        if(titleInput != '') {
            setPlaceholderError(false)
        }
    }

    const cardDescriptionHandler = (value) => {
        setDescriptionInput(value)
    }

    const acceptEditCardHandler = () => {
        if(titleInput != ''){
            let newBoards = [...boards]

            newBoards = newBoards.map(board => {
                if(board.id == props.parentBoardID){
                    board.cardsList = board.cardsList.map(e => 
                        {
                            if(e.id == props.id) {
                                return {...e, ...{title: titleInput, description: descriptionInput, editMod: false}}
                            }
                            else return e
                        }
                    )
                }
                return board
            })

            // console.log(newBoards)
            setBoards(newBoards)
            setCardEditMod(false)
            localStorage.setItem('boardsList', JSON.stringify(newBoards))
        }
        else {
            setPlaceholderError(true)
        }
    }

    return (
        <div className={styles.boardITemWrapper}>
            {!props.empty ? 
                <div
                    className={styles.boardITemInnerWrapper}
                    draggable={true}
                    onDragStart={() => dragStartHandler(props)}
                    onDragEnd={() => dragEndHandler()}
                    onDrop={e => dropHandler(e, props)}
                    onDragOver={e => dragOverHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onMouseEnter={e => ColumnDragLockHandler(e)}
                    onMouseLeave={e => ColumnDragUnlockHandler(e)}
                >
                    <div className={styles.titleWrapper}>
                        {!cardEditMod ? 
                            <div className={styles.title}>
                                {props.title}
                            </div>
                            :
                            <div className={styles.titleInputWrapper}>
                                <textarea 
                                    onChange={(e) => cardTitleInputHandler(e.target.value)}
                                    value={titleInput}
                                    placeholder={'Введите заголовок'}
                                    className={classNames(placeholderMod, pointerMod)}
                                />
                            </div>
                        }
                        <div className={styles.optionsWrapper}>
                            {cardEditMod &&
                                <div 
                                    className={classNames(styles.acceptEdit, pointerMod)}
                                    onClick={() => acceptEditCardHandler()}
                                >
                                    &#10004;
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
                                        onClick={() => cardEditModHandler()}
                                    >
                                        &#9998;
                                    </div>
                                    <div 
                                        className={styles.deleteIcon}
                                        onClick={() => deleteCardHanlder()}
                                    >
                                        &#10006;
                                    </div>
                                </div>
                                <div
                                    className={styles.settingsIcon}
                                    draggable={false}
                                    // onDrop={e => false}
                                    onClick={() => optionsButtonHandler()}
                                >
                                    ...
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.descriptionWrapper}>
                        {!cardEditMod ? 
                            props.description
                            :
                            <div className={styles.descriptionInputWrapper}>
                                <textarea
                                    onChange={(e) => cardDescriptionHandler(e.target.value)}
                                    placeholder={'Введите описание'}
                                    value={descriptionInput} 
                                    className={pointerMod}
                                />
                            </div>
                        }
                    </div>
                </div> 
            : 
                <div 
                    className={styles.emptyColumnItem}
                    draggable={false}
                    onDrop={e => emptyDropHandler(e)}
                >
                    {props.title}
                </div>
            }
        </div>
    );
};
