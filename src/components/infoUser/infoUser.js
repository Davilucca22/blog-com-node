import { useEffect, useState } from "react";
import { DiAptana } from "react-icons/di";
import { GoX } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import "./infoUser.css"

export default function InfoUser({ objDados, Arrseguindo }) {
    const [dados, setDados] = useState(objDados || [])
    const [arraySeguidores, setSeguidores] = useState(Arrseguindo || [])
    const [modal, setmodal] = useState(false)
    const [sair, setSair] = useState(false)


    useEffect(() => {
        setDados(objDados || [])
        setSeguidores(Arrseguindo || [])
    }, [objDados, Arrseguindo])

    return (
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
                            <GoX id="back" />
                        </button>
                        <span><a href="/editperfil">EDITAR PERFIL</a></span>
                        <span><a href="/editainfo">INFORMAÇOES DO USUARIO</a></span>
                        <span><a href="/editsenha">SENHA E SEGURANÇA</a></span>
                        <span>TEMA</span>
                        <span onClick={() => setSair(true)}>SAIR</span>
                    </div>
                </section>
            }

            <div id="conteinerHamburguer">
                <button id="BThamburguer2" onClick={() => setmodal(true)}>
                    <FiMenu id="hamburguer2" />
                </button>
            </div>

            <section id="bio">
                <div id="infoUser">
                    <div id="contImg"><img src={dados.fotoPerfil} alt="sem foto"></img></div>
                    <div id="contadores">
                        <div id="textos">
                            <div><span id="nomeP">{dados.name}</span>
                                <button id="configVdesktop" onClick={() => setmodal(true)}><DiAptana /></button>
                            </div>
                            <div id="legendas">
                                <div className="info">
                                    <span>{dados.posts?.length ?? 0}</span>{/*se encontrar o array post, retorna o tamanho, senao retorna 0*/}
                                    <span>Posts</span>
                                </div>
                                <div className="info">
                                    <span>{dados.seguindo?.length ?? 0}</span>
                                    <span>Seguindo</span>
                                </div>
                                <div className="info">
                                    {arraySeguidores.length !== 0 &&
                                        <span>{arraySeguidores.length ?? 0}</span>
                                    }
                                    {arraySeguidores.length === 0 &&
                                        <span><a href={`/seguidores/${dados._id}`}>{dados.seguidores?.length ?? 0}</a></span>
                                    }
                                    <span>Seguidores</span>
                                </div>
                            </div>
                            <p id="bioDesktop">{dados.biografia}</p>
                        </div>
                    </div>
                </div>
                <p id="bioMobile">{dados.biografia}</p>
            </section>
        </div>
    )
}