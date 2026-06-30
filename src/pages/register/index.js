import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css"
import { toast } from "react-toastify";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import Loading from "../../components/loading/loading";
import { useRegister } from "../../Hooks/useRegister";

export default function Register() { 
 
    const { Register } = useRegister()
    const [nome, setnome] = useState('')
    const [email, setemail] = useState('')
    const [senha, setsenha] = useState('')
    const [DataNasc,setNasc] = useState('')
    const [foto, setfoto] = useState(null)
    const [Preview,setPreview] = useState('./assets/semfoto.jpeg')
    const [idade,setIdade] = useState('')
    const [modal,setmodal] = useState(false)
    const [showBTN,setShowBTN] = useState(false) 

    useEffect(() => {
        return () => Preview && URL.revokeObjectURL(Preview)
    }, [Preview])  

    function formataData(e){
       let v = e.target.value.replace(/\D/g, "") 

        if(v.length > 2) v = v.slice(0,2) + "/" + v.slice(2) 
        if(v.length > 5) v = v.slice(0,5) + "/" + v.slice(5,9) 
        
        const [dia, mes, ano] = v.split('/') 

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

    async function EnviaBack(e) { 
        e.preventDefault()

        try {
            if(nome && email && senha && DataNasc){
                if(senha.length < 6){
                    toast.error("senha muito curta")
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
                            formData.append('foto',foto) 
                        }
                        
                        setmodal(true)
                        const res = await Register({formData})
                        if(res?.msgerr){
                            setmodal(false)
                        }
                    }
                }
            }else{
                toast.error("prencha todos os campos")
            }
        }catch(e){
            console.log("Erro:",e)
        }
    }

    return (
        <main id="MainRegister">
            <div id="telaPreta">
                {modal && <Loading />}
                <div id="ConteinerForm1">
                    <form id="form1" onSubmit={e => EnviaBack(e)}>
                        
                        <div id="divFT">
                            <img id="FTuser" src={Preview} alt="foto de perfil" />
                            <input id="anexaFt" type="file" title="Escolha uma foto de perfil"
                                onChange={e => {
                                    const file = e.target.files[0]
                                    setfoto(file);
                                    if(file){
                                        setPreview(URL.createObjectURL(file))
                                    }
                                }}
                            />
                        </div>

                        <div id="divInputs">
                            <div className="input-group">
                                <label>Nome de Usuario</label>
                                <input className="input-field" type="text" value={nome} onChange={e => setnome(e.target.value)} required />
                            </div>
                            
                            <div className="input-group">
                                <label>E-mail</label>
                                <input className="input-field" type="email" value={email} onChange={e => setemail(e.target.value)} required />
                            </div>
                            
                            <div className="input-group">
                                <label>Senha</label>
                                <div className="password-wrapper">
                                    <input className="input-field" type={showBTN ? 'text' : 'password'} value={senha} onChange={e => setsenha(e.target.value)} required />
                                    <button id="olhoBTN" type="button" onClick={() => setShowBTN(!showBTN)}>
                                        {showBTN ? <IoEyeOffSharp /> : <IoEyeSharp />}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="input-group">
                                <label>Data de Nascimento</label>
                                <input className="input-field" type="text" placeholder="DD/MM/AAAA" value={DataNasc} onChange={e => formataData(e)} required />
                            </div>

                            <button id="botaoEnviar" className="btn-primary" type="submit">CRIAR CONTA</button>
                            <span id="login">Já tem uma Conta? <Link to="/">Faça Login</Link></span>
                        </div>
                    </form>
                    <img id="imgDesktopVersion" src="/assets/arvores.jfif" alt="foto de paisagem"></img>
                </div>
            </div>
        </main>
    )
}
