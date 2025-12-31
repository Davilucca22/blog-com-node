import react, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { data } from "react-router-dom";
import Menu from "../../components/menu/menu";
import "./feed.css"

export default function Feed(){
    const [nome, setNome] = useState('')
    const [foto,setFoto] = useState(null)
    const [dados,setDados] = useState([])

    useEffect(() => { //dados dos posts
        fetch("http://localhost:3000/feed?page=1",{
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(data =>{  
            setDados(data.data)
        })

        fetch("http://localhost:3000/session",{ //dados apenas da sessao
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(email => {
            setNome(email.name)
            setFoto(email.fotoPerfil)
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

    function curtir(id){

        const coracao = document.getElementById(id)

        coracao.style.color = "red"

        fetch(`http://localhost:3000/${id}/curtida`,{
            method:"PUT",
            credentials:"include",
            headers:{
              'Content-Type': 'application/json'  
            }
        }).then(res => res.json())
        .then(data =>{  
            setDados(data.data)
        })
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

                <div id="vazio" /* apenas preenche o espaço vazio atras do header no main, pro conteudo ficar pra baixo do header */></div>

                {dados.map(val =>(
                    val.posts.map(el => (

                        <section className="conteinerPost">

                        <div className="cabecalhoPost">
                            <img className="fotoP" src={val.fotoPerfil} alt="foto"></img>
                            <span>{val.name}</span>
                        </div>

                        <div className="imgPost">
                            <img src={el.imgURL} alt={el.textoPost}></img>
                            <div className="tres">
                                <IoIosHeart onClick={e => curtir(el._id)} id={el._id} className="curtida"/>
                                <span className="numLikes">{el.curtidas}</span>
                                <FaRegComment className="comentario"/>
                            </div>
                            {el.textoPost && 
                                <span className="comentPost">{val.name}: {el.textoPost}</span>
                            }
                        </div>  
                        </section>

                        ))
                    ))
                }

            </main>

            <footer id="vazio" /* apenas preenche o espaço vazio atras do heder no main, pro conteudo ficar pra baixo do header */></footer>
            <Menu/>
        </div>
    )
}