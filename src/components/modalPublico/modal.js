import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './modal.css'

export default function Modal({publico}){

    const [Pub,setPub] = useState(publico || [])
    const navigate = useNavigate()

    useEffect(() => {
        setPub(publico || [])
    },[publico])

    function telaUser(id) {
        navigate(`/details/${id}`)
    }

    return(
        <aside id="conteinerModal">
            <nav>
                <div id="divaleatoria">
                    <h3 id="tituloSeg">Seguidores</h3>
                    <span>X</span>
                </div>
                <ul id="listaPublico">
                    {Pub.map(pessoa => (
                        <li className="pessoa">
                            <img className="imgSeg" src={pessoa.urlFoto} alt="foto de perfil do usuario"></img>
                            <span onClick={() => telaUser(pessoa.IDseguindo)}>{pessoa.nameSeguindo}</span>
                        </li>
                    ))
                    }
                </ul>
            </nav>
        </aside>
    )
}