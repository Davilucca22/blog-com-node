import React, { useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { GoPlusCircle } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

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
                <Link className="contIcon" to="/feed"> <GrHomeRounded className="icon" /> <label className="link" >HOME  </label></Link>
                <Link className="contIcon" to="/postar"><GoPlusCircle className="icon" /> <label className="link">POST  </label></Link>
                <Link className="contIcon" to="/busca"><FaSearch className="icon" /> <label className="link">BUSCA </label></Link>
                <Link className="contIcon" to={`/Perfil/${id}`}><img src={img} alt="foto do usuario"></img><label className="link">PERFIL</label></Link> {/*passa id do usuario na url*/}
            </div>
        </footer>
    )
}