import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InfoUser from '../../components/infoUser/infoUser'
import FeedDePosts from '../../components/feedDePosts/feedDePosts'
import Menu from '../../components/menu/menu'
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import './perfilOutro.css'
import { CgClose } from "react-icons/cg";

// pegar o id que foi mandado da outra tela e buscar no banco o usuario correspondente
export default function PerfilOutro(){

    const { id } = useParams() //id do usuario clicado
    const [dados,setDados] = useState([]) //dados do usuario clicado
    const [posts,setposts] = useState([]) //posts do usuario clicado
    const [TempArray,setTempArray] = useState([]) //seguidores do usuario clicado

    const [meuId,setMeuId] = useState('') //id do usuario da sessao
    const [nome,setnome] = useState('') //nome do usuario da sessao
    const [foto,setfoto] = useState('') //foto do usuario da sessao

    const [zoomFT,setZoomFT] = useState(false) // define a montagem do componente de janela modal
    const [legendaSeg,setLegendaSeg] = useState('') //legenda que mostra se o usuario ja segue o outro

    useEffect(() => {

        fetch(`${process.env.REACT_APP_URL_SITE}/session`,{ //dados da sessao
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

        fetch(`${process.env.REACT_APP_URL_SITE}/perfiloutro/${id}`,{ //busca dados do usuario clicado
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(item => {
            setDados(item) // todos os dados exceto login
            setTempArray(item.seguidores) //seguidores do usuario clicado
        })
        
        fetch(`${process.env.REACT_APP_URL_SITE}/feedUser/${id}`,{ //trata os posts do usuario clicado, retorna num formato mais dinamico
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(lista => setposts(lista))
    
    },[id]) // se der merda pode ser aqui

    useEffect(() => {
        
    if(!meuId) return

    const sera = TempArray.some( //checa se o id do usuario da sessao esta no array de seguidores do usuario clicado
        item => item.IDseguidor === meuId
    )

    setLegendaSeg(sera ? 'Seguindo...' : '+Seguir')

    },[TempArray,meuId])

    function DeixarDeSeguir(){
        
        setTempArray(prev => 
            prev.filter(item => item.IDseguidor !== meuId) //se eu ja seguir a pessoa, sou removido do array temporario
        ) 

        setLegendaSeg("+ Seguir")
        
        try{
            fetch(`${process.env.REACT_APP_URL_SITE}/DeixarDeSeguir`,{ //deixa de seguir no banco
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
            return [...prev,{IDseguidor:meuId,nameSeguindo:nome,urlFoto:foto}] //impede de duplicar com clique duplo
        })
        setLegendaSeg("Seguindo...")

        try{
            fetch(`${process.env.REACT_APP_URL_SITE}/Seguir`,{
                method:"PUT",
                credentials:"include",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    IdOutro:id,
                    nameSeguindo:dados.name,
                    urlFoto:dados.fotoPerfil
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
                        <CgClose id="voltar" onClick={() => setZoomFT(false)}/>
                    </div>
                    <FeedDePosts Posts={posts} name={nome} Foto={foto} />
                </nav>
                }    
            <div id="contVoltaFeed">
                <a href='/feed'>
                    <IoArrowBackOutline/>
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
                <hr></hr>
                <div id="conteinerPosts">
                        {dados.posts &&
                            dados.posts?.slice().reverse().map((item,index) => (
                                <Link key={item._id} to={"#post-" + item._id}><img onClick={() => setZoomFT(true)} className="postUser" id={"post-" + item._id} src={item.imgURL} alt="foto"></img></Link>
                            ))
                        }
                </div>
            </div>
            <Menu />
            <footer id="footer"></footer>    
        </main>
    )
}