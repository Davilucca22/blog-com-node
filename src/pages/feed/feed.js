import react, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineCheck, AiOutlineClose  } from "react-icons/ai";
import Menu from "../../components/menu/menu";
import "./feed.css"
import { toast } from "react-toastify";

export default function Feed(){
    const [nome, setNome] = useState('')
    const [foto,setFoto] = useState(null)
    const [dados,setDados] = useState([])
    const [modal,setmodal] = useState(false)
    const [sair,setSair] = useState(false)
    const [verComent,setverComent] = useState('')
    const [textComent,setTextComent] = useState('')

    useEffect(() => { //dados dos posts
        fetch("http://localhost:3000/feed?page=1",{
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(data =>{  
            setDados(data)
            setInterval(() => {
                fetch("http://localhost:3000/attdados",{
                    method:"PUT",
                    credentials:"include",
                    headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data
                })
            }).then(res => res.json())
            .then(resp => {
                setDados(resp) //passa os posts atualizados
            })
            }, 5000); // 5 seg

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

    useEffect(() => { //trava o scroll quando os comentarios aparecerem

        if(verComent !== ''){
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    },[verComent])

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

    function Addcomentario(e,id){

        e.preventDefault()

        try{
            fetch('http://localhost:3000/comentario',{
                method:"PUT",
                credentials:"include",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    IDpost:id,
                    nome:nome,
                    foto:foto,
                    comentario:textComent
                })
            })

            setTextComent('')

            setDados(prev => {
                return prev.map(item => {
                    if(item.post._id === id)
                        return{
                    ...item,
                    post:{
                        ...item.post,
                        comentarios:[...item.post.comentarios, {textoComentario:textComent, donoComentario:nome, fotoDono:foto}]
                    }
                    }
                    return item     
                })
            })

        }catch(e){
            toast.error(e)
        }
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
                    <span><a href="/editperfil">EDITAR PERFIL</a></span>
                    <span><a href="#">EDITAR INFORMAÇOES DE LOGIN</a></span>
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

                        <section key={val.post._id} className="conteinerPost" id={index} >

                        {verComent === index &&
                            <div id="conteinerComent">
                                <button type="button" id="sairComent" onClick={() => setverComent('')}><AiOutlineClose  /></button>
                                <dl id="comentarios">
                                {val.post.comentarios?.map(item => (
                                        <div className="contComentario">
                                            <img className="fotoDono" src={item.fotoDono} alt="foto do dono do comentario"></img>
                                            <div className="infoComent">
                                                <dt className="user">{item.donoComentario}</dt>
                                                    <dd className="usercoment">{item.textoComentario}</dd>
                                            </div>
                                        </div>
                                    ))}
                                    </dl>
                                <form id="digitaComent" onSubmit={e => Addcomentario(e,val.post._id)}>
                                    <input type="text" placeholder="digite aqui...." value={textComent} onChange={e => setTextComent(e.target.value)} ></input>
                                    <button type="submit"><AiOutlineCheck /></button>
                                </form>
                            </div>
                        }

                        <div className="cabecalhoPost">
                            <img className="fotoP" src={val.fotoPerfil} alt="foto"></img>
                            <span>{val.name}</span>
                        </div>

                        <div className="imgPost">
                            <img src={val.post.imgURL} alt={val.post.textoPost}></img>
                            <div className="tres">
                                <IoIosHeart onClick={e => curtir(val.post._id)} id={val.post._id} className="curtida"/>
                                <span className="numLikes" >{val.post.curtidas}</span>
                                <a href={`#${index}`} onClick={() => setverComent(index)} ><FaRegComment className="comentario"/></a>
                            </div>
                            {val.post.textoPost && 
                                <div>
                                <span className="comentPost">{val.name}: {val.post.textoPost}</span>
                                </div>
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
