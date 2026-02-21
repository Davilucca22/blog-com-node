import { React, useState} from "react"
import { toast } from "react-toastify"
import { IoEyeSharp  } from "react-icons/io5";

import "./login.css"

export default function Login(){

    const [email,setemail] = useState('')
    const [senha,setsenha] = useState('')
    const [showBTN,setShowBTN] = useState('')

    async function enviaBack(e){
        e.preventDefault()

        if(email && senha){

            const res = await fetch("http://localhost:3000/login",{
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body:JSON.stringify({
                    email:email,
                    senha:senha
                }) ,
                credentials:'include'
            })

            if(!res.ok) throw new Error("erro ao enviar dados")

            const data = await res.json()

            if(data.msg){
                toast.success(data.msg)
                window.open('/feed')
            }else{
                toast.error(data.msgerr)
            }

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
