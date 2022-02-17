import { VscGithubInverted } from 'react-icons/vsc'

import styles from './styles.module.scss'

export function LoginBox() {
  return (
   <div className={styles.LoginBoxWrapper}>
     <strong>Entre e compartilhe sua mensagem</strong>
     <a href="a" className={styles.signinWithGithub}>
       <VscGithubInverted size='24' />
       Entrar com Github
     </a>

   </div> 
  )
}