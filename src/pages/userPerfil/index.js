import {react, useEffect, useState} from "react";
import Menu from "../../components/menu/menu";
import "./index.css"
import { FiMenu } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import Coment from "../../components/comentarios/coments";


export default function PerfilUser() {
    const [dados,setDados] = useState([])
    const [posts, setPosts] = useState([])
    const [modal,setmodal] = useState(false)
    const [sair,setSair] = useState(false)
    const [zoomFT,setZoomFT] = useState(null)
 
    useEffect(() => {
        fetch("http://localhost:3000/session",{
            method:"GET",
            credentials:"include"
        }).then(res => res.json()
        ).then(dados => {
            setDados(dados)
        })

        fetch("http://localhost:3000/feedUser", {
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(infos => {
            setPosts(infos)
        })
    },[])

    return (
        <div id="conteinerPerfil">
        <main>
        {modal && 
            <section id="modal">
                {sair &&
                <div id="ModalSair">
                    <div id="confirmaSair">
                        <p>SAIR?</p>
                        <div id="BTNs">
                            <button id="BTNcancel" onClick={() => setSair(false)}>Cancelar</button>
                            <button id="BTNconfirm"><a href="/" >Confirma</a></button>
                        </div>
                    </div>
                </div>
                }
                <div id="botoes">
                    <button onClick={() => setmodal(false)}>
                        <IoArrowBackOutline id="back"/>
                    </button>
                    <span><a href="/editperfil">EDITAR PERFIL</a></span>
                    <span><a href="/editainfo">INFORMAÇOES DO USUARIO</a></span>
                    <span><a href="/editsenha">SENHA E SEGURANÇA</a></span>
                    <span>TEMA</span>
                    <span onClick={() => setSair(true)}>SAIR</span>
                </div>
            </section>
        }
                <section id="bio">
                    <div id="conteinerHamburguer">
                        <button id="BThamburguer2" onClick={() => setmodal(true)}>
                            <FiMenu id="hamburguer2" />
                        </button>
                    </div>
                    <div id="infoUser">
                        <div id="contadores">
                            <img src={dados.fotoPerfil} alt="sem foto"></img>
                            <div id="textos">
                                <span id="nomeP">{dados.name}</span>
                                <div id="legendas">
                                    <div className="info">
                                        <span>{posts.length}</span>
                                        <span>Posts</span>
                                    </div>
                                    <div className="info">
                                        <span>{dados.infos.seguindo}</span>
                                        <span>Seguindo</span>
                                    </div>
                                    <div className="info">
                                        <span>{dados.infos.seguidores}</span>
                                        <span>Seguidores</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p>{dados.bio}</p>
                    </div>
                </section>
                <div id="Posts">
                    <h1>POSTAGENS</h1>
                    
                    {zoomFT &&
                        <Coment Posts={posts} name={dados.name} Foto={dados.fotoPerfil} />
                    }
                </div>
                <footer id="footer"></footer>
            </main>
            <Menu /> {/* barra de menu no inferior da tela, usado em outras rotas */}
        </div>
    )
}
