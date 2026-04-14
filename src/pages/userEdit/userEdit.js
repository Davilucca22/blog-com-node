import react, { useContext, useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import './userEdit.css'
import { toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import { Link } from "react-router-dom";
import { FeedContext } from "../../context/FeedContext";

export default function UserEdit(){

    const {dadosSessao} = useContext(FeedContext)

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

        const formadata = new FormData()

        if(nome){
            formadata.append("nome",nome)
        }else{
            toast.warning("preencha o nome de usuario")
            return
        }
        formadata.append("bio",bio)
        formadata.append("foto",dadosSessao.res?.fotoPerfil) //foto atual

        if(novafoto){
            formadata.append("novafoto",novafoto) //se tiver uma nova foto, ela sera enviada para o banco de dados
        }

        try{
            const env = await fetch(`${process.env.REACT_APP_URL_SITE}/editperfil`,{
                method:"PUT",
                credentials:"include",
                body:formadata
            })

            setload(false) //esconde a janela de loading
            toast.success('dados enviados') 
            
            const data = await env.json()
            console.log(data.erro)

        }catch(e){
            console.log(e)
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
                setload(true)
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
