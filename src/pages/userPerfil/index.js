import {react, useEffect, useState} from "react";
import Menu from "../../components/menu/menu";
import "./index.css"
import { FiMenu } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";

export default function PerfilUser() {
    const [nome,setNome] = useState('')
    const [Seguidores,setSeguidores] = useState(0)
    const [Seguindo,setSeguindo] = useState(0)
    const [Foto,setFoto] = useState(null)
    const [Posts,setPosts] = useState([])


    useEffect(() => {
        fetch("http://localhost:3000/perfil",{
            method:"GET",
            credentials:"include"
        }).then(res => res.json()
        ).then(dados => {
            setNome(dados.name)
            setFoto(dados.fotoPerfil)
            setSeguidores(dados.infos.seguidores)
            setSeguindo(dados.infos.seguindo)
            setPosts(dados.posts)
        })
    },[])

    function mostramodal(){
        const modal = document.getElementById('modal')

        modal.style.display = "block"
    }

    function escondemodal(){
        const modal = document.getElementById('modal')

        modal.style.display = "none"
    } 
    return (
        <div id="conteinerPerfil">
            <main>
                <section id="modal">
                <div>
                    <button onClick={escondemodal}>
                        <IoArrowBackOutline id="back"/> 
                    </button>
                    <span>EDITAR PERFIL</span>
                    <span>TEMA</span>
                </div>
                </section>
                <section id="bio">
                    <div id="conteinerHamburguer">
                        <button id="BThamburguer2" onClick={mostramodal}>
                            <FiMenu id="hamburguer2" />
                        </button>
                    </div>
                    <div id="infoUser">
                        <div id="contadores">
                            <img src={Foto} alt="sem foto"></img>
                            <div id="textos">
                                <span id="nomeP">{nome}</span>
                                <div id="legendas">
                                    <div className="info">
                                        <span>{Posts.length}</span>
                                        <span>Posts</span>
                                    </div>
                                    <div className="info">
                                        <span>{Seguindo}</span>
                                        <span>Seguindo</span>
                                    </div>
                                    <div className="info">
                                        <span>{Seguidores}</span>
                                        <span>Seguidores</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p>lorem ipsm dolor fet</p>
                    </div>
                    <div id="Posts">
                        <h1>POSTAGENS</h1>
                        <div id="imgs">
                            {Posts.map((e,index) =>(
                                <img src={e.imgURL} alt={index}></img>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Menu /> {/* barra de menu no inferior da tela, usado em outras rotas */}
        </div>
    )
}