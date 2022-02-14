import React, { useContext } from 'react';
import styles from './style.module.css';
import { globalStateContext } from '../../globalState/globalState';
import { BoardColumn } from '../board-column/boardColumn';
import { getRandomID } from '../../utils/randomID';
export const Board = (props) => {

    const globalState = useContext(globalStateContext)

    const { boards } = globalState

    return (
        <div className={styles.boardWrapper}>
            <div className={styles.columnsWrapper}>
                {boards.map(item => 
                    <BoardColumn
                        boardTitle={item.boardTitle}
                        boardID={item.boardID}
                        cardsList={item.cardsList}
                        editMod={item.editMod}
                        key={item.boardID}
                    />    
                )}
            </div>
            {boards.length === 0 &&
                <div className={styles.emptyBoard}>
                    Пока что у вас нет досок
                </div>
            }
        </div>
    );
};
