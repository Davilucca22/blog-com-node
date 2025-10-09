import React, { useState } from "react";

export default function Login() {

    const [nome, setnome] = useState('')
    const [email, setemail] = useState('')
    const [senha, setsenha] = useState('')


    async function EnviaBack(e) { //envia os dados para o backend
        e.preventDefault()

        try {
            if(nome && email && senha){
                const res = await fetch('http://localhost:3000/login', {
                    method: 'POST', //metodo para mandar dados 
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({ nome, email, senha }) //monta o body para mandar para o back como JSON
                })
    
                if(!res.ok) throw new Error('Erro ao enviar dados'); //lança um novo erro caso o back retorne diferente de ok
    
                const data = await res.json()
                console.log("resposta do servidor:", data)
    
                setnome('')
                setemail('')
                setsenha('')

            }else{
                alert('Preencha todos os campos!')
                setnome('')
                setemail('')
                setsenha('')

            }

        }catch(e){
            console.log("Erro:",e)
        }
    }

    return (
        <main>
            <form onSubmit={e => EnviaBack(e)}>
                <label>
                    Nome:
                    <input type="text" placeholder="Seu Nome..." value={nome} onChange={e => setnome(e.target.value)}></input>
                </label>
                <label>
                    Email:
                    <input type="email" placeholder="Seu melhor email..." value={email} onChange={e => setemail(e.target.value)}></input>
                </label>
                <label>
                    Senha:
                    <input type="password" placeholder="Senha Forte..." value={senha} onChange={e => setsenha(e.target.value)}></input>
                </label>
                <button type="submit">enviar</button>
            </form>
        </main>
    )
}