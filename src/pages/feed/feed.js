import react, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import Menu from "../../components/menu/menu";
import "./feed.css"

export default function Feed(){
    const [nome, setNome] = useState('')
    const [foto,setFoto] = useState(null)
    const [dados,setDados] = useState([])
    const [modal,setmodal] = useState(false)
    const [sair,setSair] = useState(false)

    useEffect(() => { //dados dos posts
        fetch("http://localhost:3000/feed?page=1",{
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(data =>{  
            setDados(data)
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

    function curtir(id){

        const coracao = document.getElementById(id)
        coracao.style.color = "red"

        fetch(`http://localhost:3000/${id}/curtida`,{ //envia o id do post pro back atualizar a curtida
            method:"PUT",
            credentials:"include",
            headers:{
              'Content-Type': 'application/json'  
            }
        })

        setDados(prev =>{ //atualiza a curtida
            return prev.map(item =>{
                if(item.post._id === id){
                    return{
                        ...item,
                        post:{
                            ...item.post,
                            curtidas: item.post.curtidas + 1
                        }
                    }
                }
                return item
            })
        })
    }

    return(
        <div id="conteinerFeed">
        {modal && 
            <section id="modal">
                {sair &&
                <div id="ModalSair">
                    <div id="confirmaSair">
                        <p>SAIR?</p>
                        <div id="BTNs">
                            <button id="BTNcancel" onClick={() => setSair(false)}>Cancelar</button>
                            <button id="BTNconfirm"><a href="/" >Confirma</a></button>
                        </div>
                    </div>
                </div>
                }
                <div id="botoes">
                    <button onClick={() => setmodal(false)}>
                        <IoArrowBackOutline id="back"/>
                    </button>
                    <span>EDITAR PERFIL</span>
                    <span>TEMA</span>
                    <span onClick={() => setSair(true)}>SAIR</span>
                </div>
            </section>
        }
            <header id="HeaderFeed">
                <span>
                    <img src={foto} alt="foto do usuario"></img>
                    <p>{nome}</p>
                </span>
                <button id="BThamburguer" onClick={() => setmodal(true)}>
                    <FiMenu id="hamburguer" />
                </button>
            </header>

            <main id="MainFeed">

                <div id="vazio" /* apenas preenche o espaço vazio atras do header no main, pro conteudo ficar pra baixo do header */></div>

                {dados.map((val,index) =>(

                        <section key={val.post._id} className="conteinerPost">

                        <div className="cabecalhoPost">
                            <img className="fotoP" src={val.fotoPerfil} alt="foto"></img>
                            <span>{val.name}</span>
                        </div>

                        <div className="imgPost">
                            <img src={val.post.imgURL} alt={val.post.textoPost}></img>
                            <div className="tres">
                                <IoIosHeart onClick={e => curtir(val.post._id)} id={val.post._id} className="curtida"/>
                                <span className="numLikes" >{val.post.curtidas}</span>
                                <FaRegComment className="comentario"/>
                            </div>
                            {val.post.textoPost && 
                                <span className="comentPost">{val.name}: {val.post.textoPost}</span>
                            }
                        </div>  

                        </section>

                    ))
                }

            </main>

            <footer id="vazio" /* apenas preenche o espaço vazio atras do heder no main, pro conteudo ficar pra baixo do header */></footer>
            <Menu/>
        </div>
    )
}