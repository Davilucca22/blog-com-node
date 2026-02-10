import react, { useEffect, useState } from "react";
import Menu from '../../components/menu/menu.js'
import { FaSearch } from "react-icons/fa";
import './buscaUser.css'

export default function BuscaUser() {
    const [nome,setName] = useState('')
    const [resultado,setResultado] = useState(null)

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_URL_SITE}/buscar?nome=${nome}`,{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(dados => {
            setResultado(dados)
        })
    },[nome])

    return(
        <main>
            <section id="conteinerInput">
                <div>
                    <input type="text" placeholder="Busca por nome..." value={nome} onChange={e => setName(e.target.value)}></input>
                    <button type="submit">
                        <FaSearch />
                    </button>
                </div>
            </section>
            <div>
                <ul id="listaUsers">
                    {nome &&
                        resultado.map(user => (
                            <li>
                                <a href={`/details/${user._id}`}>
                                    <img src={user.fotoPerfil} alt="foto user"></img>
                                    <span>{user.name}</span>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <Menu/>
        </main>
    )
}