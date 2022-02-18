import styles from './styles.module.scss'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import logoImg from '../../assets/LogoDoWhile.svg'

// colocar apenas as tipagens que irão ser utilizadas na aplicação
type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

export function MessageList() {
   // o estado armazenará uma lista de mensagens
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    //similar ao await, executa depois.
    api.get<Message[]>('messages/last3').then(response => {
      setMessages(response.data)
    })
  }, [])
  
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="" />

      <ul className={styles.messageList}>
        {messages.map(message => { // para cada message(no caso 3), irá incluir enviar colocar os conteúdos dentro das caixas {message.dadosDaReposta}
          return (
            <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message.text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
          )
        })}
        </ul>
      </div>
  )
}