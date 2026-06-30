import { React, useState} from "react"
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import Loading from "../../components/loading/loading.js";
import "./login.css"
import { useLogin } from "../../Hooks/useLogin.js";

export default function Login(){

    const { login } = useLogin()
    const [email,setemail] = useState('')
    const [senha,setsenha] = useState('')
    const [showBTN,setShowBTN] = useState(false)
    const [modal,setModal] = useState(false)

    async function enviaBack(e){
        e.preventDefault()

        if(email && senha){
            setModal(true)
            const res = await login({email:email, senha})
            if(res?.msgerr){
                setModal(false)
            }
            setemail('')
            setsenha('')
        }
    }         

    return( 
        <main id="MainLogin">  
            <div id="telaPreta1">
                {modal && <Loading />}
                <div id="ConteinerForm">
                    <form id="form" onSubmit={e => enviaBack(e)}>
                        <h2>Bem-vindo de volta</h2>
                        
                        <div className="input-group">
                            <label>Email</label>
                            <input className="input-field" type="email" placeholder="Seu email" value={email} onChange={e => setemail(e.target.value)} required />
                        </div>
                        
                        <div className="input-group">
                            <label>Senha</label>
                            <div className="password-wrapper">
                                <input className="input-field" type={showBTN ? 'text' : 'password'} placeholder="Sua senha" value={senha} onChange={e => setsenha(e.target.value)} required />
                                <button id="olhoBTN1" type="button" onClick={() => setShowBTN(!showBTN)}>
                                    {showBTN ? <IoEyeOffSharp /> : <IoEyeSharp />}
                                </button>
                            </div>
                        </div>

                        <button id="entrar_1" className="btn-primary" type="submit">ENTRAR</button> 
                        
                        <section id="conteinerSpan">
                            <span id="esqueciSnh">ESQUECI MINHA SENHA</span>
                            <span id="NovoUSer">Novo por aqui? <a href="/register">Criar nova Conta</a></span>
                        </section>
                    </form>
                    
                    <img id="imgDesktopVersion" src="/assets/arvores.jfif" alt="foto de paisagem"></img>
                </div>
            </div>
        </main>
    )
}
