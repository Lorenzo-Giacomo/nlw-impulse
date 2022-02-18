import { useEffect } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { api } from '../../services/api'

import styles from './styles.module.scss'

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

export function LoginBox() {
  // definir url de callback que retornará o code necessário para visualizar os dados do usuário
  const signInUrl = `https://github.com/login/oauth/authorize?client_id=39056cdb577e30a2c2d3`

  async function signIn(githubCode: string) {
    // passar pra rota authenticate o githubCode. 
    // como resposta devolverá os dados do usuário autenticado e um token JWT, q permite manter o usuário autenticado por um tempo.
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode
    })

    // pegar a resposta e dividir em duas partes
    const  { token, user } = response.data 
    // armazena o token para deixar salvo
    localStorage.setItem('@dowhile:token', token)

    console.log(user)
  }

  useEffect(() => {
    // definido a url como a localização do link na janela
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')
      // redireciona para a url sem o code
      window.history.pushState({}, '', urlWithoutCode)

      signIn(githubCode)
    }

  }, [])

  return (
   <div className={styles.LoginBoxWrapper}>
     <strong>Entre e compartilhe sua mensagem</strong>
     <a href={signInUrl} className={styles.signinWithGithub}>
       <VscGithubInverted size='24' />
       Entrar com Github
     </a>

   </div> 
  )
}