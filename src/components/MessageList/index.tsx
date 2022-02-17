import styles from './styles.module.scss'
import { api } from '../../services/api'
import { useEffect } from 'react'
import logoImg from '../../assets/LogoDoWhile.svg'

export function MessageList() {
  useEffect(() => {
    //similar ao await, executa depois.
    api.get('messages').then(response => {
      console.log(response.data)
    })
  }, [])
  
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
          Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/lorenzo-giacomo.png" alt="" />
            </div>
            <span>Lorenzo Giacomo</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
          Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/lorenzo-giacomo.png" alt="" />
            </div>
            <span>Lorenzo Giacomo</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
          Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/lorenzo-giacomo.png" alt="" />
            </div>
            <span>Lorenzo Giacomo</span>
          </div>
        </li>

        </ul>
      </div>
  )
}