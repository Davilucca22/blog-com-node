import React, { useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { GoPlusCircle } from "react-icons/go";
import { FaSearch } from "react-icons/fa";

import "./menu.css"

export default function Menu() {

    const [img, setImg] = useState(null)
    const [id, setId] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL_SITE}/session`, {
            method: "GET",
            credentials: "include"
        }).then(res => res.json())
            .then(dados => {
                setImg(dados.fotoPerfil)
                setId(dados._id)
            })
    }, []) 

    return (
        <footer id="FooterFeed">
            <div>
                <a className="contIcon" href="/feed"> <GrHomeRounded className="icon" /> <label className="link" >HOME  </label></a>
                <a className="contIcon" href="/postar"><GoPlusCircle className="icon" /> <label className="link">POST  </label></a>
                <a className="contIcon" href="/busca"><FaSearch className="icon" /> <label className="link">BUSCA </label></a>
                <a className="contIcon" href={`/Perfil/${id}`}><img src={img} alt="foto do usuario"></img><label className="link">PERFIL</label></a> {/*passa id do usuario na url*/}
            </div>
        </footer>
    )
}