import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './feedDePosts.css'
import { IoIosHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

export default function FeedDePosts({ Posts, name, Foto, MeuID }) {

    const navigate = useNavigate()
    const [dados, setDados] = useState(Posts || [])
    const [verComent, setverComent] = useState('')
    const [textComent, setTextComent] = useState('')
    const [nome, setNome] = useState(name || '')
    const [foto, setFoto] = useState(Foto || '')
    const [ID, setID] = useState(MeuID || '')
    const [Vdesktop, setVdesktop] = useState(false)

    useEffect(() => {
        setDados(Posts || [])
        setID(MeuID || '')
        setNome(name || '')
        setFoto(Foto || '')
    }, [Posts, name, Foto, MeuID])


    useEffect(() => {
        if (dados.length > 0) {
            const interval = setInterval(() => {//retorna os posts do feed atualizados a cada 5 segundos
                fetch(`${process.env.REACT_APP_URL_SITE}/attdados`, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .then(resp => {
                        setDados(resp)
                    })
            }, 5000)

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
        }).then(res => console.log(res.json().msg))

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

    function telaUser(id) {
        navigate(`/details/${id}`)
    }

    return (
        <div id="conteinerFeed">
            {dados.map((val, index) => (
                <section key={val.post._id} className={Vdesktop ? "conteinerPost desk" :"conteinerPost"} id={index} >
                    <dl className={Vdesktop ? "comentarios desk" : "comentarios"}>

                        <div className={Vdesktop ? "cabecalhoPost desk" :"cabecalhoPost"}>
                            <img className="fotoP" src={val.fotoPerfil} alt="foto"></img>
                            <span onClick={() => telaUser(val.userId)}>{val.name}</span>                            
                        </div>

                        <div className={Vdesktop ? "conteinerPublicacao desk" : "conteinerPublicacao"}>
                            <div className={Vdesktop ? "imgPost desk" :"imgPost"}>
                                <img src={val.post.imgURL} id={val.post._id} alt={val.post.textoPost}></img>
                                <div className="tres">
                                    <IoIosHeart onClick={e => curtir(val.post._id)} className={
                                        val.post.curtidas.includes(ID)
                                            ? 'like ativo'
                                            : 'like'
                                    } />
                                    <span className="numLikes" >{val.post.curtidas.length}</span>
                                    <a href={`#${index}`} onClick={ () => {
                                        setverComent(index)
                                        setVdesktop(true)
                                        }} ><FaRegComment className="comentario" />
                                    </a>
                                </div>
                                {val.post.textoPost &&
                                    <div>
                                        <span className={Vdesktop ? "comentPost desk" : "comentPost"}>{val.name}:{val.post.textoPost}</span>
                                    </div>
                                }
                            </div>
                            {verComent === index &&
                                <div className={Vdesktop ? "conteinerComent desk" : "conteinerComent"}>
                                    <img src={val.post.imgURL} alt="nada" id="fotoNoComent" ></img>
                                    <div id="textos">
                                        <button type="button" id="sairComent" onClick={() => {
                                            setverComent('')
                                            setVdesktop(false)
                                            }}><AiOutlineClose /></button>
                                        <div key={val._id} id="feedComent">
                                            {val.post.textoPost &&  //se ouver texto no post do dono, ele aparece nos comentarios
                                                <div className="contComentario">
                                                    <img className="fotoDono" src={val.fotoPerfil} alt="foto do dono do comentario"></img>
                                                    <div className="infoComent">
                                                        <dt className="user">{val.name}</dt>
                                                        <dd className="usercoment">{val.post.textoPost}</dd>
                                                    </div>
                                                </div>                                            
                                            }
                                            {val.post.comentarios?.slice().reverse().map(item => (
                                                <div className="contComentario">
                                                    <img className="fotoDono" src={item.fotoDono} alt="foto do dono do comentario"></img>
                                                    <div className="infoComent">
                                                        <dt className="user">{item.donoComentario}</dt>
                                                        <dd className="usercoment">{item.textoComentario}</dd>
                                                    </div>
                                                </div>
                                                ))
                                            }
                                        </div>
                                        <form id="digitaComent" onSubmit={e => Addcomentario(e, val.post._id)}>
                                            <input type="text" placeholder="digite aqui...." value={textComent} onChange={e => setTextComent(e.target.value)} ></input>
                                            <button type="submit"><AiOutlineCheck /></button>
                                        </form>
                                    </div>
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
