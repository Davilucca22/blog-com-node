import React, { useContext, useEffect, useState } from "react";
import Menu from '../../components/menu/menu.js'
import { FaSearch } from "react-icons/fa";
import './buscaUser.css'
import { Link } from "react-router-dom";
import { FeedContext } from "../../context/FeedContext.js";
import { useBusca } from "../../Hooks/useBusca.js";

export default function BuscaUser() {

    const {dadosSessao} = useContext(FeedContext)

    const {Busca} = useBusca()
    const [nome,setName] = useState('')
    const [resultado,setResultado] = useState(null)

    useEffect(() => {
        async function chama() {
            const res = await Busca({nome:nome})
            if(res){
                setResultado(res)
            }
        }
        chama()
    }, [nome, Busca])

    return(
        <main id="contBusca">
            <section id="conteinerInput">
                <div>
                    <input type="text" placeholder="Busca por nome..." value={nome} onChange={e => setName(e.target.value)}></input>
                    <button type="submit">
                        <FaSearch />
                    </button>
                </div>
            </section>
            <div id="ContLista">
                <ul id="listaUsers">
                    {nome &&
                        resultado.filter(item => item._id !== dadosSessao.res?._id).map(user => (
                            <li key={user._id} className="blocoPerfil">
                                <Link className="LinkPerfil" to={`/details/${user._id}`}>
                                    <img className="FTuser" src={user.fotoPerfil} alt="foto user"></img>
                                    <span className="NameUser">{user.name}</span>
                                </Link>
                            </li> 
                        ))
                    }
                </ul>
            </div>
            <div id="vazio" /* apenas preenche o espaço vazio atras do header no main, pro conteudo ficar pra baixo do header */></div>
            <Menu/>
        </main>
    )
}