import React, { useContext } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { GoPlusCircle } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./menu.css"
import { FeedContext } from "../../context/FeedContext";

export default function Menu() {
    const {dadosSessao} = useContext(FeedContext)
 
    return (
        <nav id="FooterFeed">
            <div className="menu-container">
                <NavLink to="/feed" className={({ isActive }) => (isActive ? "contIcon active" : "contIcon")}>
                    <GrHomeRounded className="icon" /> 
                    <span className="link">HOME</span>
                </NavLink>
                
                <NavLink to="/postar" className={({ isActive }) => (isActive ? "contIcon active" : "contIcon")}>
                    <GoPlusCircle className="icon" /> 
                    <span className="link">POSTAR</span>
                </NavLink>
                
                <NavLink to="/busca" className={({ isActive }) => (isActive ? "contIcon active" : "contIcon")}>
                    <FaSearch className="icon" /> 
                    <span className="link">BUSCAR</span>
                </NavLink>
                
                <NavLink to={`/Perfil/${dadosSessao.res?._id}`} className={({ isActive }) => (isActive ? "contIcon active" : "contIcon")}>
                    <img className="profile-img" src={dadosSessao.res?.fotoPerfil || "https://via.placeholder.com/150"} alt="Perfil" />
                    <span className="link">PERFIL</span>
                </NavLink>
            </div>
        </nav>
    )
}