import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import './feedDePosts.css'

import { IoIosHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import { FeedContext } from "../../context/FeedContext"; 
import { useAttDados } from "../../Hooks/useAttDados";
import { useCurtir } from "../../Hooks/useCurtir";
import { useComentario } from "../../Hooks/useComentario";
import DeletaPost from "../DeletaPost/Deleta";

export default function FeedDePosts({ Posts }) {
    
    const {dadosSessao} = useContext(FeedContext)
    const {AttDados} = useAttDados()
    const {Curtida} = useCurtir()
    const {Comentar} = useComentario()
    const navigate = useNavigate()
    
    const [postagens, setPostagens] = useState(Posts || [])
    const postagenRef = useRef(Posts || [])

    const [verComent, setverComent] = useState('')
    const [textComent, setTextComent] = useState('')
    const [del,setDel] = useState('')

    const [nome, setNome] = useState(dadosSessao.res?.name || '')
    const [foto, setFoto] = useState(dadosSessao.res?.fotoPerfil || '')
    const [ID, setID] = useState(dadosSessao.res?._id || '')


    useEffect(() => {
        setNome(dadosSessao.res?.name || '')
        setFoto(dadosSessao.res?.fotoPerfil || '')
        setID(dadosSessao.res?._id || '')
    }, [dadosSessao])

    useEffect(() => {
        setPostagens(Posts || [])
        postagenRef.current = Posts || []
    }, [Posts])

    useEffect(() => {
        postagenRef.current = postagens
    }, [postagens]) 

    useEffect(() => {

        const interval = setInterval(async () => {
            if (postagenRef.current.length === 0) return
            
            const res = await AttDados({ postagens: postagenRef.current }) //atualiza comentarios a cada 8 segundos
            if (Array.isArray(res)) {
                setPostagens(res)
            }
        }, 8000)

        return () => clearInterval(interval)
    }, [AttDados]) 

    function curtir(id) {

        Curtida({PostID:id,UserID:ID}) // envia a curtida pro Banco de  Dados

        setPostagens(prev => { //atualiza a curtida visualmente
            return prev.map(item => {
                if (item.post._id === id) {

                    const jaCurtiu = item.post.curtidas.includes(ID)

                    return {
                        ...item,
                        post: {
                            ...item.post,
                            curtidas: jaCurtiu ? item.post.curtidas.filter(uid => uid !== ID) : [...item.post.curtidas, ID]
                        }
                    }
                }
                return item
            })
        })
    }

    function Addcomentario(e, id) {

        e.preventDefault()
        
        try {
            if(textComent !== ''){

                Comentar({IDpost:id,nome:nome,foto:foto,comentario:textComent}) //manda o comentario pro backend
                
                setTextComent('')
                
                setPostagens(prev => { //atualiza comentario visualmente
                    return prev.map(item => {
                        if (item.post._id === id)
                            return {
                        ...item,
                        post: {
                            ...item.post,
                            comentarios: [...item.post.comentarios, { textoComentario: textComent, donoComentario: nome, fotoDono: foto }]
                        }
                    }
                    return item
                })
                })
            
            }
        } catch (e) {
            toast.error(e)
        }
    }

    useEffect(() => { //trava o scroll quando os comentarios aparecerem
        if (typeof document === 'undefined' || !document.body) return
        if (verComent !== '') {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            if (document.body) document.body.style.overflow = 'auto'
        }
    }, [verComent])

    function telaUser(id) {
        navigate(`/details/${id}`)
    }

    function ZeraDel(){
        setDel('')
    }

    return (
        <div>
            {postagens.map((val, index) => (
                <section key={val.post._id} className="conteinerPost" id={`post-${index}`} >
                    {del.length > 0 &&
                        <DeletaPost postID={del} retorna={ZeraDel} />
                    }
                    <dl className="comentarios">

                        <div className="cabecalhoPost">
                            <div className="nomeEfoto">
                                <img className="fotoP" src={val.fotoPerfil} alt="foto"></img>
                                <span onClick={() => val.userId !== ID ? telaUser(val.userId) : ''}>{val.name}</span>
                            </div>
                            {val.userId === ID &&
                                <CgMoreVerticalAlt onClick={() => setDel(val.post._id)} className="tresPontos" />                       
                            }
                        </div>

                        <div className="conteinerPublicacao">
                            <div className="imgPost">
                                <img src={val.post.imgURL} id={"post-" + val.post._id} alt={val.post.textoPost}></img>
                                <div className="tres">
                                    <IoIosHeart onClick={e => curtir(val.post._id)} className={
                                        val.post.curtidas.includes(ID)
                                            ? 'like ativo'
                                            : 'like'
                                    } />
                                    <span className="numLikes" >{val.post.curtidas.length}</span>
                                    <Link to={`#post-${index}`} onClick={ () => {
                                        setverComent(index)
                                        }} ><FaRegComment className="iconeComentario"/>
                                    </Link>
                                </div>
                                {val.post.textoPost &&
                                    <div>
                                        <span className="comentPost">{val.name}:{val.post.textoPost}</span>
                                    </div>
                                }
                            </div>
                            {verComent === index &&
                                <div className="conteinerComent">
                                    <button type="button" id="sairComent" onClick={() => {
                                        setverComent('')
                                    }}>
                                        <AiOutlineClose />
                                    </button>
                                    <div key={val._id} id="feedComent">
                                        {val.post.textoPost &&
                                            <div className="contComentario">
                                                <img className="fotoDonoComentario" src={val.fotoPerfil} alt="foto do dono do comentario"></img>
                                                <div className="infoComent">
                                                    <dt className="nomeDonoComentario">{val.name}</dt>
                                                    <dd className="TextoComentario">{val.post.textoPost}</dd>
                                                </div>
                                            </div>
                                        }
                                        {val.post.comentarios?.slice().reverse().map(item => (
                                            <div className="contComentario" key={item._id || item.donoComentario}>
                                                <img className="fotoDonoComentario" src={item.fotoDono} alt="foto do dono do comentario"></img>
                                                <div className="infoComent">
                                                    <dt className="nomeDonoComentario">{item.donoComentario}</dt>
                                                    <dd className="TextoComentario">{item.textoComentario}</dd>
                                                </div>
                                            </div>
                                        ))}
                                        <div id="vazio"></div>
                                    </div>
                                    <form id="digitaComent" onSubmit={e => Addcomentario(e, val.post._id)}>
                                        <input type="text" placeholder="digite aqui...." value={textComent} onChange={e => setTextComent(e.target.value)} ></input>
                                        <button type="submit"><AiOutlineCheck /></button>
                                    </form>
                                </div>
                            }
                        </div>
                    </dl>
                </section>
            ))
            }
        </div>
    )
}
