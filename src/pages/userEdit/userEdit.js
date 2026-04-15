import { useContext, useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import './userEdit.css'
import { toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import { Link } from "react-router-dom";
import { FeedContext } from "../../context/FeedContext";
import useEdit from "../../Hooks/useEdit";

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
            console.log(nome, "no formdata")
        }else{
            toast.warning("preencha o nome de usuario")
            return
        }
        
        formdata.append("bio",bio)
        formdata.append("foto",dadosSessao.res?.fotoPerfil) //foto atual
        console.log("bio e foto no formdata")
        
        if(novafoto){
            formdata.append("novafoto",novafoto) //se tiver uma nova foto, ela sera enviada para o banco de dados
        }

        const res = await Editar({formdata})
        if(res){
            setload(false) //esconde a janela de loading
            toast.success('dados enviados') 
        }
    }

    return(
        <main>
            {load && 
               <Loading /> //tela de load
            }

            <div id="backtoFeed"><Link to={`/Perfil/${dadosSessao.res?._id}`}><IoArrowBackOutline /></Link></div>
            <form id="formularioUser" onSubmit={e => {
                EnviaBack(e)
                //setload(true)
                }}>
                <div id="conteinerFTuser">
                        <img id="imgUser" src={previw} alt="foto do usuario"></img>
                        <input type="file" onChange={e => {
                            const file = e.target.files[0]
                            setnovafoto(file) //mostra a janela de loading
                            if(file){
                                setpreview(URL.createObjectURL(file))
                            }
                        }}></input>
                </div>
                <div id="conteinerInputs">
                    <input type="text" placeholder="nome de usuario" value={nome} onChange={e => setnome(e.target.value)}></input>
                    <textarea id="biografia" type="text" placeholder="descreva a sua pessoa..." value={bio} onChange={e => setbio(e.target.value)}></textarea>
                    <button type="submit">SALVAR</button>
                </div>
            </form>
        </main>
    )
}
