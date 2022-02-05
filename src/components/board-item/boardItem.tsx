import React, { useContext } from 'react';
import styles from './style.module.css';
import { globalStateContext } from '../../globalState/globalState';

interface AllProps {
    title: string,
    description?: string,
    id: string,
}

const dragStartHandler = (card) => {
    console.log('drag start')
    console.log(card)
}

const dragOverHandler = (e) => {
    e.preventDefault()
}

const dragLeaveHandler = (e) => {
    // console.log(e)
}

export const BoardItem = (props: AllProps) => {

    const [boards, setBoards] = useContext(globalStateContext)

    const dropHandler = (e, card) => {
        e.preventDefault()
        console.log('drag drop')
        // console.log(card.title + ' ' + card.id)
    
    }

    const dragEndHandler = (card) => {
        console.log('drag end')
        console.log(card)

        let boardsSort = [...boards]
        
        // boardsSort = boardsSort.map(e => e.cardsList.filter(item => item.id != card.id))

        // console.log(boardsSort)

        // boardsSort = boardsSort.map(e => {
        //     return {e, ...e.cardsList.filter(item => item.id != card.id)}
        // })

        // boardsSort = boardsSort.map(e => Object.keys(e).filter(item => item.id != card.id))

        // boardsSort.forEach(e => Object.keys(e).forEach(e => console.log(e)))

        console.log(boardsSort)
    }

    return (
        <div 
            className={styles.boardITemWrapper}
            draggable={true}
            onDragStart={e => dragStartHandler(props)}
            onDragEnd={e => dragEndHandler(props)}
            onDrop={e => dropHandler(e, props)}
            onDragOver={e => dragOverHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
        >
            <div className={styles.title}>
                {props.title}
            </div>
            <div className={styles.description}>
                {props.description}
            </div>
        </div>
    );
};
