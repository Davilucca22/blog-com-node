import react, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { data } from "react-router-dom";
import Menu from "../../components/menu/menu";
import "./feed.css"

export default function Feed(){
    const [nome, setNome] = useState('')
    const [foto,setFoto] = useState(null)

    useEffect(() => { //busca os dados no backend
        fetch("http://localhost:3000/feed",{
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(data =>{
            console.log("dados recebidos")
            setNome(data.name) 
            setFoto(data.fotoPerfil)
        })
    },[])

    function mostramodal(){
        const modal = document.getElementById('modal')

        modal.style.display = "block"
    }

    function escondemodal(){
        const modal = document.getElementById('modal')

        modal.style.display = "none"
    }

    return(
        <div id="conteinerFeed">
            <section id="modal">
                <div>
                    <button onClick={escondemodal}>
                        <IoArrowBackOutline id="back"/>
                    </button>
                    <span>EDITAR PERFIL</span>
                    <span>TEMA</span>
                </div>
            </section>
            <header id="HeaderFeed">
                <span>
                    <img src={foto} alt="foto do usuario"></img>
                    <p>{nome}</p>
                </span>
                <button id="BThamburguer" onClick={mostramodal}>
                    <FiMenu id="hamburguer" />
                </button>
            </header>
            <main id="MainFeed">
                <div id="vazio" /* apenas preenche o espaço vazio atras do heder no main, pro conteudo ficar pra baixo do header */></div>
            </main>
            <Menu/>
        </div>
    )
}