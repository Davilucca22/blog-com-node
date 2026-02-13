import { React, useState} from "react"
import { toast } from "react-toastify"

import "./login.css"

export default function Login(){

    const [email,setemail] = useState('')
    const [senha,setsenha] = useState('')

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
            <div id="ConteinerForm">
                <form id="form" onSubmit={e => enviaBack(e)}>
                    <label>Email:
                        <input id="inptEmail" type="email" value={email} onChange={e => setemail(e.target.value)}></input>
                    </label>
                    <label>Senha:
                        <input type="password" value={senha} onChange={e => setsenha(e.target.value)}></input>
                    </label>                    
                    <button id="entrar_1" type="Submit">ENTRAR</button>
                </form>
                <section id="conteinerSpan">
                    <span id="esqueciSnh">ESQUECI MINHA SENHA</span>
                    <span id="NovoUSer">Novo por aqui?<a href="/register">Criar nova Conta</a></span>    
                </section>
            </div>
        </main>
    )
}
