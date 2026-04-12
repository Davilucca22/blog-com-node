import React, { useContext, useEffect, useState } from "react";
import "./editInfo.css"
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FeedContext } from "../../context/FeedContext";
import useEditInfo from "../../Hooks/useEdtaInfo";

export default function EditInfo() {

    const {dadosSessao} = useContext(FeedContext)

    const {EditaInfo} = useEditInfo()
    const [email,setemail] = useState(dadosSessao.res?.email || '')
    const [dataNasc,setdataNasc] = useState(dadosSessao.res?.dataNasc  || '')
    const [active,setactive] = useState(true)
    const [idade,setIdade] = useState('')

    useEffect(() => {
        CalcIdade(dataNasc) //calcula a idade assim que recebe a data de nascimento do BD
    },[dataNasc])

    function formataData(e){
       let v = e.target.value.replace(/\D/g, "") //só numeros

        if(v.length > 2) v = v.slice(0,2) + "/" + v.slice(2) //insere a barra a partir do 2 numero
        if(v.length > 5) v = v.slice(0,5) + "/" + v.slice(5,9) //insere a barra a partir do 5 numero
        
        const [dia, mes, ano] = v.split('/') //divide a data pelas barras

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
        }else{
            toast.warning('Voce precisa ser maior de idade para usar o app')
            return
        }
    }

    return(
        <main id="conteinerInfo">
            <div id="backFeed">
                <Link to={`/Perfil/${dadosSessao.res?._id}`}>
                    <IoArrowBackOutline/>
                </Link>
                <span onClick={() => {
                    if(active){
                        setactive(false)
                    }else{
                        setactive(true)
                    }
                }}>EDITAR</span>    
            </div>
            <form onSubmit={e => {
                EnviaBack(e)
                }} id="conteinerForm">
                <label for="">DATA DE NASCIMENTO<input type="text" placeholder="DATA DE NASCIMENTO..." value={dataNasc} onChange={e => formataData(e)} disabled={active}></input></label>
                <label for="">E-MAIL<input type="email" placeholder="SEU MELHOR EMAIL" value={email} onChange={e => setemail(e.target.value)} disabled={active}></input></label>
                <button type="submit">SALVAR</button>
            </form>
        </main>
    )
}
