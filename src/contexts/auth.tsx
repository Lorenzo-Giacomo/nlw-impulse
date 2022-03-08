import {createContext, ReactNode, useState} from 'react';
import { useEffect } from 'react'
import { api } from '../services/api'



type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  // usuário terão os tipos pré definidos ou o nulo, pois pode ou não estar autenticado(sem dados dentro do User)
  user: User | null
  signInUrl: string; 
  signOut: () => void;
  // função que não tem retorno
}

// quais dados terão dentro do contexto? e qual o formato de dados?
export const AuthContext = createContext({} as AuthContextData)

type AuthProvider = {
  children: ReactNode; // qualquer qualquer coisa aceitavel pelo react, numero, etc
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}


// componente
export function AuthProvider(props: AuthProvider) {
  // propriedades no react são informações que passamos de componentes para outros. Ex: href, className

    const [user, setUser] = useState<User | null>(null)

    // definir url de callback que retornará o code necessário para visualizar os dados do usuário
    const signInUrl = `https://github.com/login/oauth/authorize?client_id=39056cdb577e30a2c2d3`

    // função para enviar código github para o back-end conseguir fazer login
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

    // verificar login mesmo sem dar refresh na página, todas as req feitas a partir do login enviarão junto o token de autenticação
    api.defaults.headers.common.authorization = `Bearer ${token}`

    // no final de processo de login, os dados do usuário autenticado que vêm de dentro do back-end vão ser salvos dentro do estado de user.
    setUser(user)
  }

  // função para signOut
  function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }


  useEffect(() => {
    // pegar pelo token as informações do usuário para que após atualizar a página ainda esteja visível no console
    const token = localStorage.getItem('@dowhile:token')

    //se tiver o token armazenado, fazer uma chamada pra api para pegar os dados da profile e enviar nos dados da resposta
    if (token) {
      // precisa enviar o token dentro da requisição
      // o axios permite que a partir dessa linha vá automaticamente como header da requisição o token
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<User>('profile').then(response => {
        setUser(response.data)
        // salvar dentro do estado da requisição
      })
    }
  }, [])

  useEffect(() => {
    // definindo a url como a localização do link na janela
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      // se a url tiver o code do git hub, pegar tudo o que vier antes.
      const [urlWithoutCode, githubCode] = url.split('?code=')
    
      window.history.pushState({}, '', urlWithoutCode)
// redireciona para a url sem o code
      signIn(githubCode)
    }

  }, [])

  // retorna algo que vem de dentro do contexto
  return ( 
    // o AuthContext.Provider permite que todos os outros componentes que estejam dentro dele, tenham acesso às informações do contexto. (se está autenticado ou não)
    <AuthContext.Provider value={{signInUrl, user, signOut}}>
      {props.children}
    </AuthContext.Provider>

    /** A props.children é exatamente o conteúdo que coloco dentro do elemento, do componente
     * 
     * <AuthProvider>
     *  fdsfsdfdsfdsf
     * </AuthProvider>
     */
  )
}