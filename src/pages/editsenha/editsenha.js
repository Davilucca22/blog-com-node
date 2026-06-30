import React, { useContext,useState } from "react";
import { IoArrowBackOutline, IoEyeSharp, IoEyeOffSharp  } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import "./editsenha.css"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FeedContext } from "../../context/FeedContext";
import { useSenha } from "../../Hooks/useSenha";

export default function EditSenha(){
    const {dadosSessao} = useContext(FeedContext)
    const {AttSenha} = useSenha()
    const [showA,setshowA] = useState(false)
    const [showB,setshowB] = useState(false)
    const [senhaAtual,setAtual] = useState('')
    const [senhaNova,setNova] = useState('')

    async function EnviaBack(e){
        e.preventDefault()

        if(senhaNova.length < 6){
            toast.warning('senha muito curta')
            return
        }else{
            AttSenha({senhaAtual,senhaNova})
            setAtual('')
            setNova('')
            toast.success("Senha atualizada!")
        }
    }

    return(
        <main className="edit-page-container">
            <div className="edit-header">
                <Link to={`/Perfil/${dadosSessao.res?._id}`} className="back-btn">
                    <IoArrowBackOutline />
                </Link>
                <h2>Alterar Senha</h2>
            </div>
            
            <div id="cadeado"><FaLock/></div>
            
            <form onSubmit={EnviaBack} id="formSenha">
                <div className="input-group">
                    <label>Senha Atual</label>
                    <div className="password-wrapper">
                        <input className="input-field" placeholder="Digite sua senha atual" value={senhaAtual} onChange={e => setAtual(e.target.value)} type={showA ? "text" : "password"} required />
                        <button type="button" className="olhoBTN" onClick={() => setshowA(!showA)}>
                            {showA ? <IoEyeOffSharp /> : <IoEyeSharp />}
                        </button>
                    </div>
                </div>
                
                <div className="input-group">
                    <label>Nova Senha</label>
                    <div className="password-wrapper">
                        <input className="input-field" placeholder="Digite sua nova senha" value={senhaNova} onChange={e => setNova(e.target.value)} type={showB ? "text" : "password"} required />
                        <button type="button" className="olhoBTN" onClick={() => setshowB(!showB)}>
                            {showB ? <IoEyeOffSharp /> : <IoEyeSharp />}
                        </button>
                    </div>
                </div>
                
                <button type="submit" className="btn-primary">SALVAR NOVA SENHA</button>
            </form>
        </main>
    )
}
