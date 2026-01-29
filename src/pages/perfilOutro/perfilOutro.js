import { useEffect, useState } from 'react'
import InfoUser from '../../components/infoUser/infoUser'
import FeedDePosts from '../../components/feedDePosts/feedDePosts'
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import './perfilOutro.css'

// pegar o id que foi mandado da outra tela e buscar no banco o usuario correspondente
export default function PerfilOutro(){
    const { id } = useParams()
    const [dados,setDados] = useState([])
    const [nome,setnome] = useState('')
    const [foto,setfoto] = useState('')
    const [posts,setposts] = useState([])
    const [zoomFT,setZoomFT] = useState(false)

    useEffect(() => {

        fetch('http://localhost:3000/session',{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(item => { 
            setnome(item.name)
            setfoto(item.fotoPerfil)
        })

        fetch(`http://localhost:3000/perfiloutro/${id}`,{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(item => {
            setDados(item)
        })
        
        fetch(`http://localhost:3000/feedUser/${id}`,{
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
                    <FeedDePosts Posts={posts} name={nome} Foto={foto} />
                </nav>
                }    
            <div id="contVoltaFeed">
                <a href="/feed">
                    <IoArrowBackOutline />
                </a>
            </div>
            <div id='vazio'></div>
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