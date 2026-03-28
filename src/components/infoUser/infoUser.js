import { useEffect, useState } from "react";
import { DiAptana } from "react-icons/di";
import { GoX } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import Modal from "../../components/modalPublico/modal"
import "./infoUser.css"

export default function InfoUser({ objDados, Arrseguindo }) {

    const [dados, setDados] = useState(objDados || []) //dados do usuario no perfil
    const [meuId,setMeuId] = useState('') //id do dono da sessao
    const [arraySeguidores, setSeguidores] = useState(Arrseguindo || []) // seguidores do usuario
    const [modal, setmodal] = useState(false) // controla a janela modal das opçoes
    const [fechaModal,setFechaModal] = useState(false) // fecha o menu de opçoes
    const [sair, setSair] = useState(false) //cancela o logoff
    const [SairAtivo,setSairAtivo] = useState(false) //controla a classe do modal confirma sair
    const [modalseg,setModalSeg] = useState(false) //controla a janela modal do conteiner de seguidores/seguindo
    const [publico,setPublico] = useState([])

    function RespostaDoMenu(resp){ // define modalseg como false
        return setModalSeg(resp)
    }

    useEffect(() => {
        setDados(objDados || [])
        setSeguidores(Arrseguindo || [])
    }, [objDados, Arrseguindo])

    useEffect(() => { // pega o id do usuario para fazer a comparaçao com o id dos dados, se for diferente, esconde o botao de opçoes.
        fetch(`${process.env.REACT_APP_URL_SITE}/session`,{
            method:"GET",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => res.json())
        .then(res => setMeuId(res._id))
    },[])

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
                                    <button id="BTNconfirm"><a href="/" >Confirma</a></button>
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