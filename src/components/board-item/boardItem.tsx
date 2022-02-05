import React from 'react';
import styles from './style.module.css';

interface AllProps {
    title: string,
    description?: string,
    id: string,
}

const dragStartHandler = (e, card) => {
    console.log('drag start')
    console.log(card)
}

const dragEndHandler = (e, card) => {
    // console.log('drag end')
    // console.log(card)
}

const dropHandler = (e, card) => {
    e.preventDefault()
    console.log('drag drop')
    console.log(card)
}

const dragOverHandler = (e) => {
    e.preventDefault()
}

const dragLeaveHandler = (e) => {
    // console.log(e)
}

export const BoardItem = (props: AllProps) => {
    return (
        <div 
            className={styles.boardITemWrapper}
            draggable={true}
            onDragStart={e => dragStartHandler(e, e.target)}
            onDragEnd={e => dragEndHandler(e, e.target)}
            onDrop={e => dropHandler(e, e.target)}
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
