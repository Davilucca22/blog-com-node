import React, { useContext, useEffect, useState } from "react";
import { FeedContext } from "../../context/FeedContext";
import { FiMenu } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import Menu from "../../components/menu/menu";
import "./feed.css"
import FeedDePosts from "../../components/feedDePosts/feedDePosts";
import { USeSessao } from "../../Hooks/useSessao.js";

export default function Feed() {

    const {Sessao} = USeSessao()
    const {dadosSessao} = useContext(FeedContext)
    const [modal, setmodal] = useState(false)
    const [sair, setSair] = useState(false)
    const {dados,setDados} = useContext(FeedContext)

    
    useEffect(() => { //dados dos posts

        Sessao()

        if(dados.length === 0){
            fetch(`${process.env.REACT_APP_URL_SITE}/feed?page=1`, {
                method: "GET",
                credentials: "include"
            })
            .then(res => res.json())
            .then(data => {
                setDados(data)
            })
        }

    }, [])

    return (
        <div id="conteinerFeed">
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
                            <IoArrowBackOutline id="back" />
                        </button>
                        <span><a href="/editperfil">EDITAR PERFIL</a></span>
                        <span><a href="/editainfo">INFORMAÇOES DO USUARIO</a></span>
                        <span><a href="/editsenha">SENHA E SEGURANÇA</a></span>
                        <span>TEMA</span>
                        <span onClick={() => setSair(true)}>SAIR</span>
                    </div>
                </section>
            }
            <header id="HeaderFeed">
                <span>
                    <img src={dadosSessao.res?.fotoPerfil} alt="foto do usuario"></img>
                    <p>{dadosSessao.res?.name}</p>
                </span>
                <button id="BThamburguer" onClick={() => setmodal(true)}>
                    <FiMenu id="hamburguer" />
                </button>
            </header>

            <main id="MainFeed">

                <div id="vazio" /* apenas preenche o espaço vazio atras do header no main, pro conteudo ficar pra baixo do header */></div>
                <FeedDePosts  Posts={dados} name={dadosSessao.res?.name} Foto={dadosSessao.res?.fotoPerfil} MeuID={dadosSessao.res?._id} /> {/* conteiner do post */}
                <div id="vazio" /* apenas preenche o espaço vazio atras do header no main, pro conteudo ficar pra baixo do header */></div>
            </main>

            <Menu />
        </div>
    )
}
