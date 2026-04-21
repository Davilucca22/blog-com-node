import React, { useContext, useEffect } from "react";
import { FeedContext } from "../../context/FeedContext";
import Menu from "../../components/menu/menu";
import "./feed.css"
import FeedDePosts from "../../components/feedDePosts/feedDePosts";
import { useSessao } from "../../Hooks/useSessao.js";
import { useFeed } from "../../Hooks/useFeed.js";

export default function Feed() {

    const {Sessao} = useSessao()
    const {Feed} = useFeed()
    
    useEffect(() => {
        Sessao() //pega dados do usuario da sessao
        Feed() //feed do usuario
    },[Sessao,Feed])
    
    const {dadosSessao} = useContext(FeedContext)
    const {dados} = useContext(FeedContext)

    return (
        <div id="conteinerFeed">
            <header id="HeaderFeed">
                <span>
                    <img src={dadosSessao.res?.fotoPerfil || 'Carregando...'} alt="foto do usuario"></img>
                    <p>{dadosSessao.res?.name || 'Carregando...'}</p>
                </span>
            </header>

            <main id="MainFeed">

                <div id="vazio" /* apenas preenche o espaço vazio atras do header no main, pro conteudo ficar pra baixo do header */></div>
                <FeedDePosts  Posts={dados} name={dadosSessao.res?.name || ''} Foto={dadosSessao.res?.fotoPerfil || ''} MeuID={dadosSessao.res?._id || ''} /> {/* conteiner do post */}
                <div id="vazio" ></div>
            </main>

            <Menu />
        </div>
    )
}
