import React, { useContext } from 'react';
import styles from './style.module.css';
import { globalStateContext } from '../../globalState/globalState';
import { BoardColumn } from '../board-column/boardColumn';
export const Board = (props) => {

    const [ boards ] = useContext(globalStateContext)

    return (
        <div className={styles.boardWrapper}>
            {boards.map(item => 
                <BoardColumn
                    title={item.boardTitle}
                    cardsList={item.cardsList}
                    key={item.id}
                />    
            )}
        </div>
    );
};
