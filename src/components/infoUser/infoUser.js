import { useEffect, useState, useContext } from "react";
import { DiAptana } from "react-icons/di";
import { GoX } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import Modal from "../../components/modalPublico/modal"
import { FeedContext } from "../../context/FeedContext";
import { Link } from "react-router-dom";
import { logout } from "../../APIs/auth";
import "./infoUser.css"

export default function InfoUser({ objDados, Arrseguindo }) {
 
    const { darkTheme, setDarkTheme } = useContext(FeedContext)
    const {dadosSessao} = useContext(FeedContext)

    const [meuId] = useState(dadosSessao?.res._id || '') //id do dono da sessao

    const [dados, setDados] = useState(objDados || []) //dados do usuario no perfil
    const [arraySeguidores, setSeguidores] = useState(Arrseguindo || []) // seguidores do usuario
    const [publico,setPublico] = useState([])

    const [modal, setmodal] = useState(false) // controla a janela modal das opçoes
    const [fechaModal,setFechaModal] = useState(false) // fecha o menu de opçoes
    const [sair, setSair] = useState(false) //cancela o logoff
    const [SairAtivo,setSairAtivo] = useState(false) //controla a classe do modal confirma sair
    const [modalseg,setModalSeg] = useState(false) //controla a janela modal do conteiner de seguidores/seguindo

    function RespostaDoMenu(resp){ // define modalseg como false
        return setModalSeg(resp)
    }

    useEffect(() => {
        setDados(objDados || [])
        setSeguidores(Arrseguindo || [])
    }, [objDados, Arrseguindo])

    return (
        <div> 
            {modal &&
                <section id={fechaModal ? "SairModal" : "modal"}>
                    {sair &&
                        <div id={SairAtivo ? "SairAtivo" :"ModalSair"}>
                            <div id="confirmaSair">
                                <p>SAIR?</p>
                                <div id="BTNs">
                                    <button id="BTNcancel" onClick={() => {
                                        setSairAtivo(true)
                                        setTimeout(() => {
                                            setSair(false)
                                            setSairAtivo(false)
                                        },400);
                                    }}>Cancelar</button>
                                    <button id="BTNconfirm" onClick={() => logout()}><a href="/" >Confirma</a></button>
                                </div>
                            </div>
                        </div>
                    }
                    <div id="botoes">
                        <button onClick={() => {
                            setFechaModal(true)
                            setTimeout(() => {
                                setFechaModal(false)
                                setmodal(false)
                            },300);
                        }}>
                            <GoX id="back" />
                        </button>
                        <span><Link className="rota" to="/editperfil">EDITAR PERFIL</Link></span>
                        <span><Link className="rota" to="/editainfo">INFORMAÇOES DO USUARIO</Link></span>
                        <span><Link className="rota" to="/editsenha">SENHA E SEGURANÇA</Link></span>
                        <span className="rota" onClick={() => setDarkTheme(!darkTheme)}>TEMA ESCURO  <input className={darkTheme ? "checkbox" : "check"} type="checkbox" checked={darkTheme} readOnly></input></span>
                        <span className="rota" onClick={() => setSair(true)}>SAIR</span>
                    </div>
                </section>
            }
            {dados._id === meuId &&
            <div id="conteinerHamburguer">
                <button id="BThamburguer2" onClick={() => setmodal(true)}>
                    <FiMenu id="hamburguer2" />
                </button>
            </div>
            }
            <div id="Margem"></div>
            <section id="bio">
                <div id="infoUser">
                    <div id="contImg"><img src={dados.fotoPerfil} alt="sem foto"></img></div>
                    <div id="contadores">
                        <div id="textos">
                                <div>
                                <span id="nomeP">{dados.name}</span>
                                    {dados._id === meuId && //se nao for o perfil do usuario da sessao, as opçoes sao escondidas
                                        <button id="configVdesktop" onClick={() => setmodal(true)}><DiAptana /></button>
                                    }
                                </div>
                            <div id="legendas">
                                <div className="info">
                                    <span>{dados.posts?.length ?? 0}</span>{/*se encontrar o array post, retorna o tamanho, senao retorna 0*/}
                                    <span>Posts</span>
                                </div>
                                <div className="info">
                                    <span onClick={() => {
                                        setModalSeg(true)
                                        setPublico(dados.seguindo)
                                    }}>{dados.seguindo?.length ?? 0}</span>
                                    <span>Seguindo</span>
                                </div>
                                <div className="info">
                                    {arraySeguidores.length !== 0 &&
                                        <span onClick={() => {
                                            setModalSeg(true)
                                            setPublico(arraySeguidores)
                                        }}>{arraySeguidores.length ?? 0}</span>
                                    }
                                    {arraySeguidores.length === 0 &&
                                        <span onClick={() => {
                                            setModalSeg(true)
                                            setPublico(dados.seguidores)
                                        }}>{dados.seguidores?.length ?? 0}</span>
                                    }
                                    <span>Seguidores</span>
                                </div>
                            </div>
                            <p id="bioDesktop">{dados.biografia}</p>
                        </div>
                    </div>
                <Modal publico={publico} verModal={modalseg} DevolveProPai={RespostaDoMenu} />
                </div>
                <p id="bioMobile">{dados.biografia}</p>
            </section>
        </div>
    )
}