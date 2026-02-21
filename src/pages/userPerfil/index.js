import {react, useEffect, useState} from "react";
import Menu from "../../components/menu/menu";
import "./index.css"
import { IoArrowBackOutline } from "react-icons/io5";
import FeedDePosts from "../../components/feedDePosts/feedDePosts";
import InfoUser from "../../components/infoUser/infoUser";
import { useParams } from "react-router-dom";


export default function PerfilUser() {
    const {id} = useParams()

    const [dados,setDados] = useState([])
    const [posts, setPosts] = useState([])
    const [zoomFT,setZoomFT] = useState(false)


    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_URL_SITE}/session`,{
            method:"GET",
            credentials:"include"
        }).then(res => res.json()
        ).then(dados => {
            setDados(dados)
        })

        fetch(`http://${process.env.REACT_APP_URL_SITE}/feedUser/${id}`, {
            method:"GET",
            credentials:"include"
        }).then(res => res.json())
        .then(infos => {
            setPosts(infos)
        })
    },[])

    return (
        <div id="conteinerPerfil">
            <main>
                {zoomFT &&
                <nav id="conteinerZoom">
                    <div id="divSair">
                        <IoArrowBackOutline id="voltar" onClick={() => setZoomFT(false)}/> POSTS
                    </div>
                    <FeedDePosts Posts={posts} name={dados.name} Foto={dados.fotoPerfil} MeuID={dados._id} />
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
