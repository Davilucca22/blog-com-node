import React, { useState,useEffect } from "react";
import "./Register.css"

export default function Register() {

    const [nome, setnome] = useState('')
    const [email, setemail] = useState('')
    const [senha, setsenha] = useState('')
    const [foto, setfoto] = useState('./assets/sem-foto.jpeg')
    const [Preview,setPreview] = useState('./assets/sem-foto.jpeg')


    useEffect(() => {
        return () => Preview && URL.revokeObjectURL(Preview)
    }, [Preview])

    async function EnviaBack(e) { //envia os dados para o backend
        e.preventDefault()

        try {
            if(nome && email && senha){

                const formData = new FormData()
                formData.append('nome',nome)
                formData.append('email',email)
                formData.append('senha',senha)
                formData.append('foto',foto)

                //manda pro backend
                const res = await fetch('http://localhost:3000/register', {
                    method: 'POST', //metodo para mandar dados 
                    body: formData //manda todo o formulario pro back
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
            <section id="BemVindo">
                <h1>Bem-Vindo!</h1>
                <p>Crie sua Conta Agora</p>
            </section>
            <form id="formularioCad" onSubmit={e => EnviaBack(e)}>
                <img src={Preview}  alt="foto de perfil"></img>
                <input id="anexaFt" type="file" 
                onChange={e =>
                    {
                        const file = e.target.files[0]
                        setfoto(file);
                        if(file){
                            setPreview(URL.createObjectURL(file))
                        }   
                    }
                }/>
                <input className="inputForm" type="text" placeholder="Seu Nome..." value={nome} onChange={e => setnome(e.target.value)}></input>
                <input className="inputForm" type="email" placeholder="Seu melhor email..." value={email} onChange={e => setemail(e.target.value)}></input>
                <input className="inputForm" type="password" placeholder="Senha Forte..." value={senha} onChange={e => setsenha(e.target.value)}></input>
                <button id="botaoEnviar" type="submit">Criar Conta</button>
            </form>
            <span id="linkEntrar">
                Já tem uma Conta?<a href="/">Entrar</a>
            </span>
        </main>
    )
}