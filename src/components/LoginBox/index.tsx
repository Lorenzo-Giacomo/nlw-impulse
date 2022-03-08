import { useContext } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'

import styles from '../LoginBox/styles.module.scss'

export function LoginBox() {
  // pega o contexto criado
  const { signInUrl} = useContext(AuthContext)

  return (   <div className={styles.LoginBoxWrapper}>
     <strong>Entre e compartilhe sua mensagem</strong>
     <a href={signInUrl} className={styles.signinWithGithub}>
       <VscGithubInverted size='24' />
       Entrar com Github
     </a>

   </div> 
  )
}