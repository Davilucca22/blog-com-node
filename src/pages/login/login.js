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
        <main>
            <section id="bemVindo">
                <h1>
                    <span className="preto">BEM</span>
                    <span className="branco" >VINDO</span>
                    <span className="preto">DE</span>
                    <span className="branco1">VOLTA</span>
                </h1>
            </section>
            <form id="form" onSubmit={e => enviaBack(e)}>
                <input type="email" placeholder="SEU EMAIL..." value={email} onChange={e => setemail(e.target.value)}></input>
                <input type="password" placeholder="SUA SENHA..." value={senha} onChange={e => setsenha(e.target.value)}></input>
                <button id="entrar_1" type="Submit">ENTRAR</button>
                <span>ESQUECI MINHA SENHA</span>
            </form>
        </main>
    )
}
