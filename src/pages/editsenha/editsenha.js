import React, { useEffect, useState } from "react";
import { IoArrowBackOutline, IoEyeSharp  } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import "./editsenha.css"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function EditSenha(){
    const [id,setId] = useState('')
    const [showA,setshowA] = useState(false)
    const [showB,setshowB] = useState(false)
    const [senhaAtual,setAtual] = useState('')
    const [senhaNova,setNova] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL_SITE}/session`,{
            method:"GET",
            credentials:"include",
            headers:{
                "Content-Type": "application/json"
            }
        }).then(resp => resp.json()).then(dados => setId(dados._id))
    },[])

    async function EnviaBack(e){
        e.preventDefault()

        if(senhaNova.length < 6){

            toast.warning('senha muito curta')
            return

        }else{
            const env = await fetch(`${process.env.REACT_APP_URL_SITE}/editsenha`,{
                method:"PUT",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    senhaAtual,
                    senhaNova
                })
            })

            setAtual('')
            setNova('')
            
            const resp = await env.json() //puxa a resposta do banco

            if(resp.msg !== ''){
                toast.success(resp.msg)
            }else{
                toast.warning(resp.erro)
            }
        }

    }

    return(
        <main id="conteinerSenha">
            <div id="voltar"><Link to={`/Perfil/${id}`}><IoArrowBackOutline /></Link></div>
            <div id="cadeado"><FaLock/></div>
            <form onSubmit={e => EnviaBack(e)} id="formSenha">
                <div><input id="senhaAtual" placeholder="digite sua senha atual" value={senhaAtual} onChange={e => setAtual(e.target.value)}  type={showA ? "text" : "password"}></input>
                <button type="button" onClick={() => {
                    if(showA){
                        setshowA(false)
                    }else{
                        setshowA(true)
                    }
                }}><IoEyeSharp className="olho"/></button></div>
                <div><input id="novaSenha" placeholder="digite sua nova senha" value={senhaNova} onChange={e => setNova(e.target.value)} type={showB ? "text" : "password"}></input>
                <button type="button" onClick={() => {
                    if(showB){
                        setshowB(false)
                    }else{
                        setshowB(true)
                    }
                }}><IoEyeSharp className="olho"/></button></div>
                <button id="BTNsalva" type="submit">SALVAR</button>
            </form>
        </main>
    )
}
