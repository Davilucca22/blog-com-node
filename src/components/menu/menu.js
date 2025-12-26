import react, { useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { GoPlusCircle } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import "./menu.css"


export default function Menu() {

    const [img,setImg] = useState(null)

    useEffect(() =>{
        fetch("http://localhost:3000/perfil",{
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(dados => setImg(dados.fotoPerfil) )
    })

    return (
        <footer id="FooterFeed">
            <div>
                <a href="/feed"> <GrHomeRounded className="icon" /></a>
                <a href="/postar"><GoPlusCircle className="icon" /></a>
                <a href="/"><FaSearch className="icon" /></a>
                <a href="/perfil"><img src={img} alt="foto do usuario"></img></a>
            </div>
        </footer>

    )
}