import react, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

import './userEdit.css'
import { toast } from "react-toastify";

export default function UserEdit(){

    const [nome,setnome] = useState('')
    const [foto,setfoto] = useState('')
    const [novafoto,setnovafoto] = useState(null)
    const [previw,setpreview] = useState('')
    const [bio,setbio] = useState('')

    useEffect(() => {
        return () => {
            previw && URL.revokeObjectURL(previw)
        }
    },[previw])

    useEffect(() => {
        fetch('http://localhost:3000/session',{
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(dados => {
            setnome(dados.name)
            setpreview(dados.fotoPerfil)
            setfoto(dados.fotoPerfil)
            setbio(dados.biografia)
        })
    },[])

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
        formadata.append("foto",foto) //foto atual

        if(novafoto instanceof File){
            formadata.append("novafoto",novafoto) //se tiver uma nova foto, ela sera enviada para o banco de dados
        }else{
            toast.warning("formato de arquivo invalido")
            return
        }

        try{
            const env = await fetch("http://localhost:3000/editperfil",{
            method:"PUT",
                body:formadata,
                credentials:"include"
            })

            toast.success('dados enviados')
            
            const data = await env.json()
            console.log(data.erro)

        }catch(e){
            console.log(e)
        }

    }

    return(
        <main>
            <div id="backtoFeed"><a href="/feed"><IoArrowBackOutline /></a></div>
            <form id="formularioUser" onSubmit={e => EnviaBack(e)}>
                <div id="conteinerFTuser">
                        <img src={previw} alt="foto do usuario"></img>
                        <input type="file" onChange={e => {
                            const file = e.target.files[0]
                            setnovafoto(file)
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
