import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import "./infoUser.css"

export default function InfoUser({objDados}){
    const [dados,setDados] = useState(objDados || [])
    const [modal,setmodal] = useState(false)
    const [sair,setSair] = useState(false)

    useEffect(() => {
        setDados(objDados || [])
    },[objDados])

    return(
        <div>
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
                                    <span>{dados.posts?.length ?? 0}</span>{/*se encontrar o array post, retorna o tamanho, senao retorna 0*/}
                                    <span>Posts</span>
                                </div>
                                <div className="info">
                                    <span>{dados.seguidores?.length ?? 0}</span>{/*se encontrar seguidores, retorna o tamanho, senao retorna 0*/}
                                    <span>Seguindo</span>
                                </div>
                                <div className="info">
                                    <span>{dados.seguindo?.length ?? 0}</span>{/*se encontrar seguindo, retorna o tamanho, senao retorna 0*/}
                                    <span>Seguidores</span>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <p>{dados.biografia}</p>
                </div>
            </section>
        </div>
    )
}