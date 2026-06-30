import { useContext, useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import './userEdit.css'
import { toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import { Link } from "react-router-dom";
import { FeedContext } from "../../context/FeedContext";
import { useEdit } from "../../Hooks/useEdit";

export default function UserEdit(){

    const {dadosSessao} = useContext(FeedContext)
    const {Editar} = useEdit()

    const [nome,setnome] = useState(dadosSessao.res?.name || '')
    const [previw,setpreview] = useState(dadosSessao.res?.fotoPerfil || '')
    const [bio,setbio] = useState(dadosSessao.res?.biografia ||'')
    const [novafoto,setnovafoto] = useState(null)
    const [load,setload] = useState(false)
    
    useEffect(() => {
        return () => {
            previw && URL.revokeObjectURL(previw)
        }
    },[previw])
    
    async function EnviaBack(e){
        e.preventDefault()
        
        const formdata = new FormData()
        
        if(nome){
            formdata.append("nome",nome)
        }else{
            toast.warning("preencha o nome de usuario")
            return
        }
        
        formdata.append("bio",bio)
        formdata.append("foto",dadosSessao.res?.fotoPerfil)
        
        if(novafoto){
            formdata.append("novafoto",novafoto)
        }

        setload(true)
        const res = await Editar({formdata})
        if(res){
            setload(false)
            toast.success('dados atualizados com sucesso') 
        }else{
            setload(false)
        }
    }

    return(
        <main className="edit-page-container">
            {load && <Loading />}

            <div className="edit-header">
                <Link to={`/Perfil/${dadosSessao.res?._id}`} className="back-btn">
                    <IoArrowBackOutline />
                </Link>
                <h2>Editar Perfil</h2>
            </div>
            
            <form id="formularioUser" onSubmit={EnviaBack}>
                <div id="conteinerFTuser">
                    <img id="imgUser" src={previw} alt="foto do usuario"></img>
                    <input type="file" title="Alterar foto" onChange={e => {
                        const file = e.target.files[0]
                        setnovafoto(file) 
                        if(file){
                            setpreview(URL.createObjectURL(file))
                        }
                    }}></input>
                </div>
                
                <div id="conteinerInputs">
                    <div className="input-group">
                        <label>Nome de Usuário</label>
                        <input className="input-field" type="text" placeholder="Nome de usuário" value={nome} onChange={e => setnome(e.target.value)} />
                    </div>
                    
                    <div className="input-group">
                        <label>Biografia</label>
                        <textarea className="input-field" id="biografia" placeholder="Descreva um pouco sobre você..." value={bio} onChange={e => setbio(e.target.value)}></textarea>
                    </div>
                    
                    <button type="submit" className="btn-primary">SALVAR ALTERAÇÕES</button>
                </div>
            </form>
        </main>
    )
}
