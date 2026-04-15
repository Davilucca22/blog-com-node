import {React, useContext, useEffect, useState} from "react";
import Menu from "../../components/menu/menu";
import "./index.css"
import { CgClose } from "react-icons/cg";
import  FeedDePosts from "../../components/feedDePosts/feedDePosts"
import InfoUser from "../../components/infoUser/infoUser";
import { Link, useParams } from "react-router-dom";
import { FeedContext } from "../../context/FeedContext";
import useFeedUser from "../../Hooks/useFeedUser";


export default function PerfilUser() {

    const {id} = useParams()
    const { dadosSessao } = useContext(FeedContext)

    const [posts, setPosts] = useState([])
    const [zoomFT,setZoomFT] = useState(false)

    const {FeedUser} = useFeedUser()

    useEffect(() => {
        async function Ativause(){
            const res = await FeedUser({id})
            if(res){
                setPosts(res)
            }
        }

        Ativause()

    },[id])

    return (
        <div id="conteinerPerfil">
            <main id="mainPerfil">

                {zoomFT &&
                <nav id="conteinerZoom">
                    <div id="divSair">
                        <CgClose id="voltar" onClick={() => setZoomFT(false)}/> 
                    </div> 

                    <FeedDePosts Posts={posts} name={dadosSessao.res?.name} Foto={dadosSessao.res?.fotoPerfil} MeuID={dadosSessao.res?._id} />
                </nav>
                }

                <InfoUser objDados={dadosSessao?.res} />

                <div id="Posts">
                    <h1>POSTAGENS</h1>
                    <hr></hr> 
                    <div id="conteinerPosts">
                            {dadosSessao.res?.posts &&
                                dadosSessao.res?.posts?.slice().reverse().map((item,index) => (
                                    <Link key={item._id} to={"#post-" + item._id}><img onClick={() => setZoomFT(true)} className="postUser" di={item._id} src={item.imgURL} alt="foto"></img></Link>
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
