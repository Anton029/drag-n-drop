import React from 'react';
import styles from './style.module.css';

import { BoardItem } from '../board-item/boardItem';

interface AllProps {
	title: string,
	cardsList: [
		{   title: string,
			description: string,
			id: string
		}
	]
}

export const BoardColumn = (props: AllProps) => {

	return (
		<div 
			className={styles.columnWrapper}
			draggable={true}
		>
			<div className={styles.columnTitle}>
				{props.title}
			</div>
			<div className={styles.columnBody}>
				{props.cardsList.map(item => 
					<BoardItem 
						title={item.title}
						description={item.description}
						id={item.id}
						key={item.id}
					/>
				)}
			</div>
			<div className={styles.addCardButton}>
				+ Добавить карточку
			</div>
		</div>
	);
};
