import styles from './App.module.scss';
import {MessageList} from './components/MessageList'
import {LoginBox} from './components/LoginBox'
import { useContext } from 'react';
import { AuthContext } from './contexts/auth';
import {SendMessageForm} from './components/SendMessageForm'

export function App() {
  // pegar o usuário que vem de dentro do contexto
  const { user } = useContext(AuthContext)
  return (
    <main className= {styles.contentWrapper}>
      
      <MessageList />
      {/* if para verificar se o usuário é nulo.
      se for nulo, redirecionar para página de LoginBox, se existir ir para página de SendMessageForm */}
      { !! user ? <SendMessageForm/> : <LoginBox/>}
      {/*Se o usuário não estiver nulo, !! transforma a informação em true ou false 
       */}
    </main>
  )
}