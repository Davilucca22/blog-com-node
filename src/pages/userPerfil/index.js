import {react, useEffect, useState} from "react";
import Menu from "../../components/menu/menu";
import "./index.css"
import { FiMenu } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";


export default function PerfilUser() {
    const [nome,setNome] = useState('')
    const [bio,setbio] = useState('')
    const [Seguidores,setSeguidores] = useState(0)
    const [Seguindo,setSeguindo] = useState(0)
    const [Foto,setFoto] = useState(null)
    const [Posts,setPosts] = useState([])
    const [modal,setmodal] = useState(false)
    const [sair,setSair] = useState(false)
    const [zoomFT,setZoomFT] = useState(null)
 
    useEffect(() => {
        fetch("http://localhost:3000/session",{
            method:"GET",
            credentials:"include"
        }).then(res => res.json()
        ).then(dados => {
            setNome(dados.name)                                             
            setFoto(dados.fotoPerfil)
            setSeguidores(dados.infos.seguidores)
            setSeguindo(dados.infos.seguindo)
            setPosts(dados.posts)
            setbio(dados.biografia)
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
                        <p>{bio}</p>
                    </div>
                </section>
                <div id="Posts">
                    <h1>POSTAGENS</h1>
                    <div id="imgs">
                    {Posts.map((e,index) =>(
                        <div>
                            {zoomFT === index && 
                                <div id="janelaFoto">
                                    <div id="headerjanelaFoto">
                                        <span onClick={() => setZoomFT(null)}><GoArrowLeft/> POST</span>
                                    </div>
                                    <img id="fotoMaior" src={e.imgURL} alt="foto maior"></img>
                                    <div id="coraçao">
                                        <IoIosHeart/>
                                        {e.curtidas}
                                    </div>
                                    {e.textoPost &&
                                        <span id="legendaPost">{nome}: {e.textoPost}</span>
                                    }
                                    <hr/>
                                    <div id="contComent">
                                        {e.comentarios.map((item => (
                                        <div className="contComentario">
                                            <img className="fotoDono" src={item.fotoDono} alt="foto do dono do comentario"></img>
                                            <div className="infoComent">
                                                <dt className="user">{item.donoComentario}</dt>
                                                    <dd className="usercoment">{item.textoComentario}</dd>
                                            </div>
                                        </div>
                                            ))) 
                                        }
                                    </div>
                                </div>
                            }
                            <img src={e.imgURL} onClick={() => setZoomFT(index)} className="blocoFT" id={index} alt="foto post"></img>
                        </div>
                        ))}
                    </div>
                </div>
                <footer id="footer"></footer>
            </main>
            <Menu /> {/* barra de menu no inferior da tela, usado em outras rotas */}
        </div>
    )
}
