import React, { useContext } from 'react';
import styles from './style.module.css';
import { globalStateContext } from '../../globalState/globalState';
import { BoardColumn } from '../board-column/boardColumn';
export const Board = (props) => {

    const globalState = useContext(globalStateContext)

    const { boards } = globalState

    return (
        <div className={styles.boardWrapper}>
            {boards.map(item => 
                <BoardColumn
                    title={item.boardTitle}
                    boardID={item.id}
                    cardsList={item.cardsList}
                    orderNumber={item.orderNumber}
                    editMod={item.editMod}
                    key={item.id}
                />    
            )}
        </div>
    );
};
