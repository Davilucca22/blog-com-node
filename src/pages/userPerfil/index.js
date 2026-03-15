import {React, useEffect, useState} from "react";
import Menu from "../../components/menu/menu";
import "./index.css"
import { CgClose } from "react-icons/cg";
import FeedPerfil from "../../components/feedNoPerfil/feedNoPerfil";
import InfoUser from "../../components/infoUser/infoUser";
import { useParams } from "react-router-dom";


export default function PerfilUser() {
    const {id} = useParams()

    const [dados,setDados] = useState([])
    const [posts, setPosts] = useState([])
    const [zoomFT,setZoomFT] = useState(false)


    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL_SITE}/session`,{
            method:"GET",
            credentials:"include"
        }).then(res => res.json()
        ).then(dados => {
            setDados(dados)
        })

        fetch(`${process.env.REACT_APP_URL_SITE}/feedUser/${id}`, {
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(infos => {
            setPosts(infos)
        })
    },[id])

    return (
        <div id="conteinerPerfil">
            <main>

                {zoomFT &&
                <nav id="conteinerZoom">
                    <div id="divSair">
                        <CgClose id="voltar" onClick={() => setZoomFT(false)}/> 
                        <label for="voltar">POSTS</label>
                    </div>

                    <FeedPerfil Posts={posts} name={dados.name} Foto={dados.fotoPerfil} MeuID={dados._id} />
                </nav>
                }

                <InfoUser objDados={dados} />

                <div id="Posts">
                    <h1>POSTAGENS</h1>
                    <hr></hr> 
                    <div id="conteinerPosts">
                            {dados.posts &&
                                dados.posts?.slice().reverse().map((item,index) => (
                                    <a key={item._id} href={"#" + item._id}><img onClick={() => setZoomFT(true)} className="postUser" di={item._id} src={item.imgURL} alt="foto"></img></a>
                                ))
                            }
                    </div>
                </div>

            <footer id="footer"></footer>
            </main>
            <Menu /> {/* barra de menu no inferior da tela, usado em outras rotas */}
        </div>
    )
}
