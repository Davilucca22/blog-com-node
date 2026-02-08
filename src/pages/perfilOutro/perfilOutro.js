import { useEffect, useState } from 'react'
import InfoUser from '../../components/infoUser/infoUser'
import FeedDePosts from '../../components/feedDePosts/feedDePosts'
import Menu from '../../components/menu/menu'
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import './perfilOutro.css'
import { toast } from 'react-toastify';

// pegar o id que foi mandado da outra tela e buscar no banco o usuario correspondente
export default function PerfilOutro(){
    const { id } = useParams()
    const [meuId,setMeuId] = useState('')
    const [dados,setDados] = useState([])
    const [nome,setnome] = useState('')
    const [foto,setfoto] = useState('')
    const [posts,setposts] = useState([])
    const [zoomFT,setZoomFT] = useState(false)
    const [legendaSeg,setLegendaSeg] = useState('')
    const [TempArray,setTempArray] = useState([])

    useEffect(() => {

        fetch(`http://${process.env.REACT_APP_URL_SITE}/session`,{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(item => { 
            setnome(item.name)
            setfoto(item.fotoPerfil)
            setMeuId(item._id)
        })

        fetch(`http://${process.env.REACT_APP_URL_SITE}/perfiloutro/${id}`,{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(item => {
            setDados(item)
            setTempArray(item.seguidores)
        })
        
        fetch(`http://${process.env.REACT_APP_URL_SITE}/feedUser/${id}`,{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(lista => setposts(lista))
    
    },[])

    useEffect(() => {
        
        if(!meuId) return

    const sera = TempArray.some(
        item => item.IDseguidor === meuId
    )

    setLegendaSeg(sera ? 'Seguindo...' : '+Seguir')

    },[TempArray,meuId])

    function DeixarDeSeguir(){
        
        setTempArray(prev => 
            prev.filter(item => item.IDseguidor !== meuId) //se eu ja seguir a pessoa, sou removido do array e deixo de seguir
        ) 

        setLegendaSeg("+ Seguir")
        
        try{
            fetch(`http://${process.env.REACT_APP_URL_SITE}/DeixarDeSeguir`,{
                method:"PUT",
                credentials:"include",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    IdOutro:id                   
                })
            })
        }catch(e){
            console.log(e)
        }            
    }

    function Seguir(){

        setTempArray(prev => {
            if(prev.some(item => item.IDseguidor === meuId)) return prev
            return [...prev,{IDseguidor:meuId}] //impede de duplicar com clique duplo
        })
        setLegendaSeg("Seguindo...")

        try{
            fetch(`http://${process.env.REACT_APP_URL_SITE}/Seguir`,{
                method:"PUT",
                credentials:"include",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    IdOutro:id
                })
            })
        }catch(e){
            console.log(e)
        }
    }

    function SegueOuNao() {
        const jaSegue = TempArray.some(
            item  => item.IDseguidor === meuId
        )

        if(jaSegue){
            DeixarDeSeguir()
        }else{
            Seguir()
        }
    }
    
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
                    <span>{dados.name}</span>
                </a>
            </div>
            <div id='vazio'></div>
            <InfoUser Arrseguindo={TempArray} objDados={dados}/>
            <div id='Divseguir'>
                <button onClick={SegueOuNao} id='BtnSeguir'>{legendaSeg}</button>
            </div>
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
            <Menu />
            <footer id="footer"></footer>    
        </main>
    )
}