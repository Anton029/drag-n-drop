import React from 'react';
import styles from './style.module.css';

export const Header = () => {
    return (
		<div className={styles.headerWrapper}>
			<div className={styles.logoWrapper}>
				<div className={styles.logo}></div>
				<div className={styles.logoTitle}>React drag-n-drop todo</div>
			</div>
		</div>
    );
};
