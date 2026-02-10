import react, { useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { GoPlusCircle } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import "./menu.css"

export default function Menu() {

    const [img,setImg] = useState(null)
    const [id,setId] = useState('')

    useEffect(() =>{
        fetch(`http://${process.env.REACT_APP_URL_SITE}/session`,{
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(dados => {
            setImg(dados.fotoPerfil)
            setId(dados._id)
        })
    }, [])

    return (
        <footer id="FooterFeed">
            <div>
                <a href="/feed"> <GrHomeRounded className="icon" /></a>
                <a href="/postar"><GoPlusCircle className="icon" /></a>
                <a href="/busca"><FaSearch className="icon" /></a>
                <a href={`/Perfil/${id}`}><img src={img} alt="foto do usuario"></img></a> {/*passa id do usuario na url*/}
            </div>
        </footer>
    )
}