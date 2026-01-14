import react, { useEffect, useState } from "react";
import "./editInfo.css"
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function EditInfo() {

    const [email,setemail] = useState('')
    const [dataNasc,setdataNasc] = useState('')
    const [active,setactive] = useState(true)
    const [idade,setIdade] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/session',{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(dados => {
            setemail(dados.email)
            setdataNasc(dados.dataNasc)
        })
    },[])

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

        if(idade > 18){
            const env = await fetch('http://localhost:3000/editinfo',{
                method:"PUT",
                credentials:"include",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email,
                    dataNasc
                })
            })

            const resp = await env.json()
            if(resp.msg !== ''){
                toast.success(resp.msg)
                setactive(true)
            }else{
                toast.error(resp.erro)
            }

        }else{
            toast.warning('Voce precisa ser maior de idade para usar o app')
            return
        }
    }

    return(
        <main id="conteinerInfo">
            <div id="backFeed">
                <a href="/feed">
                    <IoArrowBackOutline/>
                </a>
                <span onClick={() => {
                    if(active){
                        setactive(false)
                    }else{
                        setactive(true)
                    }
                }}>EDITAR</span>    
            </div>
            <form onSubmit={e => EnviaBack(e)} id="conteinerForm">
                <label for="">DATA DE NASCIMENTO<input type="text" placeholder="DATA DE NASCIMENTO..." value={dataNasc} onChange={e => formataData(e)} disabled={active}></input></label>
                <label for="">E-MAIL<input type="email" placeholder="SEU MELHOR EMAIL" value={email} onChange={e => setemail(e.target.value)} disabled={active}></input></label>
                <button type="submit">SALVAR</button>
            </form>
        </main>
    )
}
