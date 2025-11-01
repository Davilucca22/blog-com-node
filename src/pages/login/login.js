import React, { useState,useEffect } from "react";
import "./login.css"

export default function Login() {

    const [nome, setnome] = useState('')
    const [email, setemail] = useState('')
    const [senha, setsenha] = useState('')
    const [foto, setfoto] = useState(null)
    const [Preview,setPreview] = useState(null)

    function verFt(){
        if(foto){
            setPreview(URL.createObjectURL(foto))
        }
    }


    useEffect(() => {
        return () => Preview && URL.revokeObjectURL(Preview)
    }, [Preview])

    async function EnviaBack(e) { //envia os dados para o backend
        e.preventDefault()

        try {
            if(nome && email && senha && foto){

                const formData = new FormData()
                formData.append('nome',nome)
                formData.append('email',email)
                formData.append('senha',senha)
                formData.append('foto',foto)

                //manda pro backend
                const res = await fetch('http://localhost:3000/login', {
                    method: 'POST', //metodo para mandar dados 
                    body: formData //manda todos o fomulario pro back
                })
    
                if(!res.ok) throw new Error('Erro ao enviar dados'); //lança um novo erro caso o back retorne diferente de ok
    
                const data = await res.json()
                console.log("resposta do servidor:", data)
    
                setnome('')
                setemail('')
                setsenha('')
                setfoto(null)

            }else{
                alert('Preencha todos os campos!')
                setnome('')
                setemail('')
                setsenha('')
                setfoto(null)
            }   

        }catch(e){
            console.log("Erro:",e)
        }
    }

    return (
        <main id="CadConteiner">
            <form id="formularioCad" onSubmit={e => EnviaBack(e)}>
                <label>
                    Foto de Perfil:
                    <input id="anexaFt" type="file" onChange={e =>{ setfoto(e.target.files[0]) ; verFt()}}/>
                </label>
                <img src={Preview} alt=""></img>
                <label>
                    Nome:
                    <input className="inputForm" type="text" placeholder="Seu Nome..." value={nome} onChange={e => setnome(e.target.value)}></input>
                </label>
                <label>
                    Email:
                    <input className="inputForm" type="email" placeholder="Seu melhor email..." value={email} onChange={e => setemail(e.target.value)}></input>
                </label>
                <label>
                    Senha:
                    <input className="inputForm" type="password" placeholder="Senha Forte..." value={senha} onChange={e => setsenha(e.target.value)}></input>
                </label>
                <button id="botaoEnviar" type="submit">Enviar</button>
            </form>
        </main>
    )
}