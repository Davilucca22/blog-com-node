import { useEffect, useState } from 'react'
import InfoUser from '../../components/infoUser/infoUser'
import FeedDePosts from '../../components/feedDePosts/feedDePosts'
import { IoArrowBackOutline } from "react-icons/io5";
import { LiaStarSolid } from 'react-icons/lia';
import { useParams } from 'react-router-dom';

// pegar o id que foi mandado da outra tela e buscar no banco o usuario correspondente
export default function PerfilOutro(){
    const { id } = useParams()
    const [dados,setDados] = useState([])
    const [posts,setposts] = useState([])
    const [zoomFT,setZoomFT] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/perfiloutro/${id}`,{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(item => {
            console.log(item)
            setDados(item)
        })
        
        fetch('http://localhost:3000/feedUser',{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(lista => setposts(lista))
    
    },[])

    return(
        <main>
                {zoomFT &&
                <nav id="conteinerZoom">
                    <div id="divSair">
                        <IoArrowBackOutline id="voltar" onClick={() => setZoomFT(false)}/> POSTS
                    </div>
                    <FeedDePosts Posts={posts} name={dados.name} Foto={dados.fotoPerfil} />
                </nav>
                }            
                <InfoUser objDados={dados}/>
            <div id="Posts">
                <h1>POSTAGENS</h1>
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
    )
}