import react, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

import './userEdit.css'

export default function UserEdit(){

    const [nome,setnome] = useState('')
    const [email,setemail] = useState('')
    const [foto,setfoto] = useState('')
    const [nascimento,setnascimento] = useState('')
    const [senha,setsenha] = useState('')
    const [novaSenha,setNovasenha] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/session',{
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(dados => {
            setnome(dados.name)
            setemail(dados.email)
            setfoto(dados.fotoPerfil)
            setnascimento(dados.dataNasc)
            setsenha(dados.senha)
        })
    },[])

    return(
        <main>
            <div id="backtoFeed"><a href="/feed"><IoArrowBackOutline /></a></div>
            <form id="formularioUser">
                <div id="conteinerFTuser">
                        <img src={foto} alt="foto do usuario"></img>
                        <input type="file"></input>
                </div>
                <div id="conteinerInputs">
                    <input type="text" placeholder="nome de usuario" value={nome} onChange={e => setnome(e.target.value)}></input>
                    <input type="text" placeholder="data de nascimento" value={nascimento} onChange={e => setnascimento(e.target.value)}></input>
                    <input type="email" placeholder="seu melhor email..." value={email} onChange={e => setemail(e.target.value)}></input>
                    <input type="password" placeholder="confirme senha atual"></input>
                    <input type="password" placeholder="nova senha" onChange={e => setNovasenha(e.target.value)}></input>
                    <button type="submit">SALVAR</button>
                </div>
            </form>
        </main>
    )
}
