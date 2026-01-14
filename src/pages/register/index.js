import React, { useState,useEffect } from "react";
import "./Register.css"
import { toast } from "react-toastify";
import Loading from "../../components/loading/loading";

export default function Register() {
 
    const [nome, setnome] = useState('')
    const [email, setemail] = useState('')
    const [senha, setsenha] = useState('')
    const [DataNasc,setNasc] = useState('')
    const [foto, setfoto] = useState(null)
    const [Preview,setPreview] = useState('./assets/semfoto.jpeg')
    const [idade,setIdade] = useState('')
    const [modal,setmodal] = useState(false)

    useEffect(() => {
        return () => Preview && URL.revokeObjectURL(Preview)
    }, [Preview]) 

    function formataData(e){
       let v = e.target.value.replace(/\D/g, "") //só numeros

        if(v.length > 2) v = v.slice(0,2) + "/" + v.slice(2) //insere a barra a partir do 2 numero
        if(v.length > 5) v = v.slice(0,5) + "/" + v.slice(5,9) //insere a barra a partir do 5 numero
        
        const [dia, mes, ano] = v.split('/') //divide a data pelas barras

        if(ano && ano.length === 4){
            const data = new Date(ano, mes - 1, dia)
            CalcIdade(data)
        }

        setNasc(v) 
    }

    function CalcIdade(data){
        const hoje = new Date()
        const nascimento = new Date(data)

        let tempodevida = hoje.getFullYear() - nascimento.getFullYear()

        let mes = hoje.getMonth() - nascimento.getMonth()
        if(mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) tempodevida--

        setIdade(tempodevida)
    }


    async function EnviaBack(e) { //envia os dados para o backend
        e.preventDefault()

        try {
            if(nome && email && senha && DataNasc){
                if(senha.length < 6){
                    toast.error("senha muito curta")
                }else if(senha.length > 8){
                    toast.error("senha muito longa")
                }else{
                    if(idade < 18){
                        toast.warning('voce nao tem idade suficiente para usar o app')
                    }else{

                        const formData = new FormData()
                        formData.append('nome',nome)
                        formData.append('email',email)
                        formData.append('senha',senha)
                        formData.append('dataNasc',DataNasc)
        
                        if(foto instanceof File){
                            formData.append('foto',foto) //só envia a foto se tiver um arquivo real
                        }
        
                        //manda pro backend
                        const res = await fetch('http://localhost:3000/register', {
                            method: 'POST', //metodo para mandar dados 
                            body: formData, //manda todo o formulario pro back
                            credentials:"include"
                        })
            
                        if(!res.ok) throw new Error('Erro ao enviar dados'); //lança um novo erro caso o back retorne diferente de ok
            
                        const data = await res.json()
                        
                        setmodal(true)

                        if(data.msg === 'Email ja cadastrado'){

                            setmodal(false)
                            setemail('')
                            toast.warning(data.msg)

                        }else{

                            setnome('')
                            setemail('')
                            setsenha('')
                            setfoto(null)
                            setNasc('')
                            window.open('/feed')

                        }
                    }

                }

            }else{
                toast.error("prencha todos os campos")
                setnome('')
                setemail('')
                setsenha('')
                setfoto(null)
                setNasc('')
            }

        }catch(e){
            console.log("Erro:",e)
        }
    }

    return (
        <main id="CadConteiner">
            {modal &&
            <Loading />
            }
            <section id="BemVindo">
               <h1>CRIE SUA CONTA AGORA!</h1>
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
                <input className="inputForm" type="text" placeholder="NOME COMPLETO..." value={nome} onChange={e => setnome(e.target.value)}></input>
                <input className="inputForm" type="email" placeholder="SEU MELHOR EMAIL..." value={email} onChange={e => setemail(e.target.value)}></input>
                <input className="inputForm" type="password" placeholder="SENHA(6 A 8 CARACTERES)" value={senha} onChange={e => setsenha(e.target.value)}></input>
                <input className="inputForm" type="text" placeholder="SUA DATA DE NASCIMENTO..." value={DataNasc} onChange={e => formataData(e) }></input>
                <button id="botaoEnviar" type="submit">CRIAR CONTA</button>
            </form>
        </main>
    )
}
