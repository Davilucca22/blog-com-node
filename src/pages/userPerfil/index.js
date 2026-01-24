import {react, useEffect, useState} from "react";
import Menu from "../../components/menu/menu";
import "./index.css"
import { FiMenu } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import FeedDePosts from "../../components/feedDePosts/feedDePosts";


export default function PerfilUser() {
    const [dados,setDados] = useState([])
    const [posts, setPosts] = useState([])
    const [modal,setmodal] = useState(false)
    const [sair,setSair] = useState(false)
    const [zoomFT,setZoomFT] = useState(false)
 
    useEffect(() => {
        fetch("http://localhost:3000/session",{
            method:"GET",
            credentials:"include"
        }).then(res => res.json()
        ).then(dados => {
            console.log(dados)
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
        {zoomFT &&
            <nav id="conteinerZoom">
                <div id="divSair">
                    <IoArrowBackOutline id="voltar" onClick={() => setZoomFT(false)}/> POSTS
                </div>
                <FeedDePosts Posts={posts} name={dados.name} Foto={dados.fotoPerfil} />
            </nav>
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
                                        <span>{dados.seguidores?.length ?? 0}</span>
                                        <span>Seguindo</span>
                                    </div>
                                    <div className="info">
                                        <span>{dados.seguindo?.length ?? 0}</span>
                                        <span>Seguidores</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p>{dados.biografia}</p>
                    </div>
                </section>
                <div id="Posts">
                    <h1>POSTAGENS</h1>
                    <div id="conteinerPosts">
                            {dados.posts &&
                                dados.posts?.slice().reverse().map((item,index) => (
                                    <a key={item._id} href={"#" + item._id}><img onClick={() => setZoomFT(true)} className="postUser" di={item._id} src={item.imgURL} alt="foto"></img></a>
                                ))
                            }
                    </div>
                </div>
                <footer id="footer"></footer>
            </main>
            <Menu /> {/* barra de menu no inferior da tela, usado em outras rotas */}
        </div>
    )
}
