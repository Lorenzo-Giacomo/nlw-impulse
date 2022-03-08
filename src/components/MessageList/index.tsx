import styles from './styles.module.scss'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'

import io from 'socket.io-client'
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

// uma fila de mensagem com uma lista de mensagens
const messagesQueue: Message[] = []

// endereço do backend em node
const socket = io('http://localhost:4000')
// quando receber uma nova mensagem, e enviar pra dentro da flia de mensagens
socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
   // o estado armazenará uma lista de mensagens
  const [messages, setMessages] = useState<Message[]>([])

  

  // função set pra atualizar o valor da variável
  useEffect(() => {
    //similar ao await, executa depois.
    // chamada pra api do back-end
    api.get<Message[]>('messages/last3').then(response => {
      setMessages(response.data)
    })
  }, [])
  
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="" />

      <ul className={styles.messageList}>
        {messages.map(message => { // para cada message(no caso 3), irá retornar os conteúdos dentro das caixas com os dados fornecidos pelo usuário {message.dadosDaReposta}
          return (
            // key = informação única
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