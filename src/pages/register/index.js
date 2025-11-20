import React, { useState,useEffect } from "react";
import "./Register.css"
import { toast } from "react-toastify";

export default function Register() {
 
    const [nome, setnome] = useState('')
    const [email, setemail] = useState('')
    const [senha, setsenha] = useState('')
    const [DataNasc,setNasc] = useState('')
    const [foto, setfoto] = useState(null)
    const [Preview,setPreview] = useState('./assets/semfoto.jpeg')

    useEffect(() => {
        return () => Preview && URL.revokeObjectURL(Preview)
    }, [Preview])


    function formataData(e){
       let v = e.target.value.replace(/\D/g, "") //só numeros

        if(v.length > 2) v = v.slice(0,2) + "/" + v.slice(2)
        if(v.length > 5) v = v.slice(0,5) + "/" + v.slice(5,9)

        setNasc(v)
    }


    async function EnviaBack(e) { //envia os dados para o backend
        e.preventDefault()

        try {
            if(nome && email && senha && DataNasc){

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
                    body: formData //manda todo o formulario pro back
                })
    
                if(!res.ok) throw new Error('Erro ao enviar dados'); //lança um novo erro caso o back retorne diferente de ok
    
                const data = await res.json()
                toast.success(data.msg)
    
                setnome('')
                setemail('')
                setsenha('')
                setfoto(null)
                setNasc('')

            }else{
                alert('Preencha todos os campos!')
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