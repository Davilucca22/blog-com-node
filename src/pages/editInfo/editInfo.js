import React, { useContext, useEffect, useState } from "react";
import "./editInfo.css"
import { IoArrowBackOutline, IoCreateOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FeedContext } from "../../context/FeedContext";
import { useEditInfo } from "../../Hooks/useEditInfo";

export default function EditInfo() {
    const {dadosSessao} = useContext(FeedContext)
    const {EditaInfo} = useEditInfo()
    
    const [email,setemail] = useState(dadosSessao.res?.email || '')
    const [dataNasc,setdataNasc] = useState(dadosSessao.res?.dataNasc  || '')
    const [active,setactive] = useState(true)
    const [idade,setIdade] = useState('')

    useEffect(() => {
        CalcIdade(dataNasc) 
    },[dataNasc])

    function formataData(e){
       let v = e.target.value.replace(/\D/g, "") 
        if(v.length > 2) v = v.slice(0,2) + "/" + v.slice(2) 
        if(v.length > 5) v = v.slice(0,5) + "/" + v.slice(5,9) 
        
        const [dia, mes, ano] = v.split('/') 
        if(ano && ano.length === 4){
            const data = new Date(ano, mes - 1, dia)
            CalcIdade(data)
        }
        setdataNasc(v)
    }

    function CalcIdade(data){
        const hoje = new Date()
        const nascimento = new Date(data)
        let tempodevida = hoje.getFullYear() - nascimento.getFullYear()
        let mes = hoje.getMonth() - nascimento.getMonth()
        if(mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) tempodevida--
        setIdade(tempodevida)
    }

    async function EnviaBack(e){
        e.preventDefault()
        if(idade >= 18){
            EditaInfo({dataNasc,email})
            setactive(true)
            toast.success("Informações atualizadas com sucesso!")
        }else{
            toast.warning('Voce precisa ser maior de idade para usar o app')
            return
        }
    }

    return(
        <main className="edit-page-container">
            <div className="edit-header">
                <Link to={`/Perfil/${dadosSessao.res?._id}`} className="back-btn">
                    <IoArrowBackOutline/>
                </Link>
                <h2>Informações Pessoais</h2>
                <button className="edit-toggle-btn" onClick={() => setactive(!active)}>
                    <IoCreateOutline /> {active ? "EDITAR" : "CANCELAR"}
                </button>
            </div>
            
            <form onSubmit={EnviaBack} id="conteinerForm">
                <div className="input-group">
                    <label>Data de Nascimento</label>
                    <input className="input-field" type="text" placeholder="DD/MM/AAAA" value={dataNasc} onChange={e => formataData(e)} disabled={active}></input>
                </div>
                
                <div className="input-group">
                    <label>E-mail</label>
                    <input className="input-field" type="email" placeholder="Seu melhor email" value={email} onChange={e => setemail(e.target.value)} disabled={active}></input>
                </div>
                
                {!active && <button type="submit" className="btn-primary">SALVAR ALTERAÇÕES</button>}
            </form>
        </main>
    )
}
