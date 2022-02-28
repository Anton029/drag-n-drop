import React, { useContext } from 'react'
import styles from './style.module.scss'
import classNames from 'classnames'
import { BGcard } from './bg-card/bgCard'
import { globalStateContext } from '../../globalState/globalState'

interface AllProps {
	bgList: string[],
}

export const SettingsPopup = (props: AllProps) => {

	const globalState = useContext(globalStateContext)

	const { isSettingsPopupOpen, setSettingsPopupOpen, boardBgLink, setBoardBgLink } = globalState

	const clickHandler = (e) => {
		const bgNumber = e.target.dataset.imageNum

		setBoardBgLink(bgNumber)
		localStorage.bgNumber = bgNumber
	}

	const closePopupHandler = () => {
		setSettingsPopupOpen(false)
	}

	const popupMod = isSettingsPopupOpen ? `${styles.popupOpen}` : ''

	return (
		<div className={classNames(styles.popupWrapper, popupMod)}>
			<div className={styles.topPopupSection}>
				<div className={styles.popupTitle}>Выберите фон для пространства досок</div>
				<div 
					className={styles.closePopupButton}
					onClick={() => closePopupHandler()}
				>
					&#10006;
				</div>
			</div>
			<div className={styles.imagesSectionWrapper}>
				<div className={styles.imagesSection}>
					{props.bgList.map((e, index) => 
						<BGcard 
							bgLink={e}
							key={index}
						/>
					)}
				</div>

			</div>
		</div>
	)
}