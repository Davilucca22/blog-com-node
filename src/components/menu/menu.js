import React, { useContext } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { GoPlusCircle } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./menu.css"
import { FeedContext } from "../../context/FeedContext";

export default function Menu() {

    const {dadosSessao} = useContext(FeedContext)
 
    return (
        <footer id="FooterFeed">
            <div>
                <Link className="contIcon" to="/feed"> <GrHomeRounded className="icon" /> <label className="link" >HOME  </label></Link>
                <Link className="contIcon" to="/postar"><GoPlusCircle className="icon" /> <label className="link">POST  </label></Link>
                <Link className="contIcon" to="/busca"><FaSearch className="icon" /> <label className="link">BUSCA </label></Link>
                <Link className="contIcon" to={`/Perfil/${dadosSessao.res?._id}`}><img src={dadosSessao.res?.fotoPerfil} alt="foto do usuario"></img><label className="link">PERFIL</label></Link> {/*passa id do usuario na url*/}
            </div>
        </footer>
    )
}