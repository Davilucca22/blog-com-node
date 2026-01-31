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
    const [dados,setDados] = useState([])
    const [nome,setnome] = useState('')
    const [foto,setfoto] = useState('')
    const [toSeguindo,setToSeguindo] = useState([])
    const [posts,setposts] = useState([])
    const [zoomFT,setZoomFT] = useState(false)
    const [legendaSeg,setLegendaSeg] = useState('+ Seguir')
    const [TempArray,setTempArray] = useState([])

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
            setToSeguindo(item.seguindo)
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

    function DeixarDeSeguir(){
        setLegendaSeg("+ Seguir")

        const rem = toSeguindo.filter(item => item.IDseguindo !== id)
        
        setTempArray(rem)

        try{
            fetch('http://localhost:3000/DeixarDeSeguir',{
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
        setLegendaSeg("Seguindo...")

        TempArray.push({IDseguindo:id})

        try{
            fetch('http://localhost:3000/Seguir',{
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
    
        if(TempArray.length > 0){
            const jaSegue = TempArray.some(
                item  => item.IDseguindo === id
            )

            if(jaSegue){
                DeixarDeSeguir()
            }else{
                Seguir()
            }
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