import { React, useState} from "react"
import { IoEyeSharp  } from "react-icons/io5";

import "./login.css"
import { useLogin } from "../../Hooks/useLogin.js";

export default function Login(){

    const { login } = useLogin()
    const [email,setemail] = useState('')
    const [senha,setsenha] = useState('')
    const [showBTN,setShowBTN] = useState('')

    async function enviaBack(e){
        e.preventDefault()

        if(email && senha){

            login({email:email, senha})

            setemail('')
            setsenha('')
        }
    }         

    return( 
        <main id="MainLogin">  
            <div id="telaPreta1">
            <div id="ConteinerForm">
                    <form id="form" onSubmit={e => enviaBack(e)}>
                            <label>Email:</label>
                            <div className="divInput">
                                <input className="inptlogin" type="email" value={email} onChange={e => setemail(e.target.value)}></input>
                            </div>
                            <label>Senha:</label>
                            <div className="divInput">
                                <input className="inptlogin" type={ showBTN ? 'text' : 'password'} value={senha} onChange={e => setsenha(e.target.value)}></input>
                                <button id="olhoBTN1" type="button" onClick={() => {
                                    if(showBTN){
                                        setShowBTN(false)
                                    }else{
                                        setShowBTN(true)
                                    }
                                }}><IoEyeSharp /></button>
                            </div>
                        <button id="entrar_1" type="Submit">ENTRAR</button> 
                        <section id="conteinerSpan">
                            <span id="esqueciSnh">ESQUECI MINHA SENHA</span>
                            <span id="NovoUSer">Novo por aqui?<a href="/register">Criar nova Conta</a></span>
                        </section>
                    </form>
                <img id="imgDesktopVersion" src="./assets/foto1.jfif" alt="foto de paisagem"></img>
            </div>
            </div>
        </main>
    )
}
