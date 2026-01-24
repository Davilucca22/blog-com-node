import react, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import Menu from "../../components/menu/menu";
import "./feed.css"
import FeedDePosts from "../../components/feedDePosts/feedDePosts";

export default function Feed() {
    const [nome, setNome] = useState('')
    const [foto, setFoto] = useState(null)
    const [modal, setmodal] = useState(false)
    const [sair, setSair] = useState(false)
    const [dados,setDados] = useState([])

    useEffect(() => { //dados dos posts
        fetch("http://localhost:3000/feed?page=1", {
            method: "GET",
            credentials: "include"
        }).then(res => res.json())
            .then(data => {
                setDados(data)
            })

        fetch("http://localhost:3000/session", { //dados apenas da sessao
            method: "GET",
            credentials: "include"
        }).then(res => res.json())
            .then(email => {
                setNome(email.name)
                setFoto(email.fotoPerfil)
            })
    }, [])

    useEffect(() => {
        console.log('feed:', dados)
    },[dados])

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
                    <img src={foto} alt="foto do usuario"></img>
                    <p>{nome}</p>
                </span>
                <button id="BThamburguer" onClick={() => setmodal(true)}>
                    <FiMenu id="hamburguer" />
                </button>
            </header>

            <main id="MainFeed">

                <div id="vazio" /* apenas preenche o espaço vazio atras do header no main, pro conteudo ficar pra baixo do header */></div>
                <FeedDePosts  Posts={dados} name={nome} Foto={foto} /> {/* conteiner do post */}

            </main>

            <Menu />
        </div>
    )
}
