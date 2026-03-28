import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './feedNoPerfil.css'
import { IoIosHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import DeletaPost from "../DeletaPost/deleta";

export default function FeedPerfil({ Posts, name, Foto, MeuID }) {

    const navigate = useNavigate()
    const [dados, setDados] = useState(Posts || [])
    const [verComent, setverComent] = useState('')
    const [textComent, setTextComent] = useState('')
    const [nome, setNome] = useState(name || '')
    const [foto, setFoto] = useState(Foto || '')
    const [ID, setID] = useState(MeuID || '')
    const [Desktop, setDesktop] = useState(false)
    const [Del,setDel] = useState('')

    useEffect(() => {
        setDados(Posts || [])
        setID(MeuID || '')
        setNome(name || '') 
        setFoto(Foto || '') 
    }, [Posts, name, Foto, MeuID])

    useEffect(() => { //verifica a largura da tela para mudar o layout  
        if (typeof window === 'undefined' || !window.matchMedia) return
        const media = window.matchMedia("(min-width:640px)")
        const handler = () => setDesktop(media.matches)
        setDesktop(media.matches)

        media.addEventListener("change", handler)
        return () => media.removeEventListener("change", handler)
    }, [])

    useEffect(() => {
        if (dados.length > 0) {
            const interval = setInterval(() => {//retorna os posts do feed atualizados a cada 5 segundos
                fetch(`${process.env.REACT_APP_URL_SITE}/attdados`, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        dados
                    })
                }).then(res => res.json())
                    .then(resp => {
                        setDados(resp)
                    })
                    .catch(err => {
                        console.error('Erro ao atualizar dados:', err)
                    })
            }, 5000);

            return () => clearInterval(interval)
        }

    }, [dados])

    function curtir(id) {

        fetch(`${process.env.REACT_APP_URL_SITE}/curtida`, {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PostID: id,
                UserID: ID
            })
        }).then(res => res.json())
            .then(data => {
                // Curtida atualizada com sucesso
            })
            .catch(err => {
                console.error('Erro ao curtir:', err)
                toast.error('Erro ao curtir post')
            })

        setDados(prev => { //atualiza a curtida
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

                fetch(`${process.env.REACT_APP_URL_SITE}/comentario`, { //atualiza comentario no back
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        IDpost: id,
                        nome: nome,
                        foto: foto,
                        comentario: textComent
                    })
                }).then(res => res.json())
                    .then(data => {
                        // Comentário adicionado com sucesso
                    })
                    .catch(err => {
                        console.error('Erro ao adicionar comentário:', err)
                        toast.error('Erro ao adicionar comentário')
                    })
                
                setTextComent('')
                
                setDados(prev => { //atualiza comentario no front
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

    function zeraDel(num){
        setDel('')
    }

    return ( 
        <div>
            {dados.map((val, index) => (
                <section key={val.post._id} className="conteinerPost2" id={index} >
                    <dl id="comentarios2">
                        {Del.length > 0 &&
                            <DeletaPost postID={Del} retorna={zeraDel} />
                        }
                        <div className="conteinerPublicacao2" id={val.post._id}>
                        <div className="cabecalhoPost2">
                            <div className="nomeEfoto2">
                                <img className="fotoP2" src={val.fotoPerfil} alt={`Foto de perfil de ${val.name}`}></img>
                                <span onClick={() => navigate(`/details/${val.userId}`)}>{val.name}</span>
                            </div>
                            {val.userId === ID && //edita o proprio post
                                <span className="treePoints2" onClick={() => setDel(val.post._id)}><CgMoreVerticalAlt/></span>
                            }
                        </div>
                            <div id="corpoPub" >
                                <div id="layoutPost">
                                    <div className="imgPost2">
                                        <img src={val.post.imgURL} alt={val.post.textoPost}></img>
                                        <div className="tres2">
                                            <IoIosHeart onClick={e => curtir(val.post._id)} className={
                                                val.post.curtidas.includes(ID)
                                                    ? 'like2 ativo2'
                                                    : 'like2'
                                            } />
                                            <span className="numLikes2" >{val.post.curtidas.length}</span>
                                            {!Desktop &&
                                                <a href={`#${index}`} onClick={() => setverComent(index)} ><FaRegComment className="comentario" /></a>
                                            }
                                        </div>
                                        {val.post.textoPost &&
                                            <div>
                                                <span className="comentPost2">{val.name}:{val.post.textoPost}</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {(verComent === index ||  Desktop) &&
                                    <div id="conteinerComent2">
                                        <div id="textos2">                                                
                                        <button type="button" id="sairComent2" onClick={() => {
                                            setverComent('')
                                            }}><AiOutlineClose /></button>
                                            <div key={val._id} id="feedComent2">
                                            {val.post.textoPost && 
                                                    <div key={`coment`} className="contComentario2">
                                                        <img className="fotoDono2" src={val.fotoPerfil} alt={`Foto de ${val.name}`}></img>
                                                        <div className="infoComent2">
                                                            <dt className="user2">{val.name}</dt>
                                                            <dd className="usercoment2">{val.post.textoPost}</dd>
                                                        </div>
                                                    </div>
                                            }

                                                {val.post.comentarios?.slice().reverse().map((item, idx) => (
                                                    <div key={`comentario-${val.post._id}-${idx}`} className="contComentario2">
                                                        <img className="fotoDono2" src={item.fotoDono ? item.fotoDono : foto} alt={`Foto de ${item.donoComentario}`}></img>
                                                        <div className="infoComent2">
                                                            <dt className="user2">{item.donoComentario}</dt>
                                                            <dd className="usercoment2">{item.textoComentario}</dd>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <form id="digitaComent2" onSubmit={e => Addcomentario(e, val.post._id)}>
                                                <input type="text" placeholder="digite aqui...." value={textComent} onChange={e => setTextComent(e.target.value)} ></input>
                                                <button type="submit"><AiOutlineCheck /></button>
                                            </form>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                    </dl>
                </section>
            ))
            }
        </div>
    )
}
