import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import InfoUser from '../../components/infoUser/infoUser'
import FeedDePosts from '../../components/feedDePosts/feedDePosts'
import Menu from '../../components/menu/menu'

import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import { CgClose } from "react-icons/cg";

import './perfilOutro.css'

import { FeedContext } from '../../context/FeedContext'

import usePerfilOutro from '../../Hooks/usePerfilOutro' 
import useFeedUser from '../../Hooks/useFeedUser'

// pegar o id que foi mandado da outra tela e buscar no banco o usuario correspondente
export default function PerfilOutro(){

    const {OutroUSer} = usePerfilOutro()
    const {FeedUser} = useFeedUser()
    const { id } = useParams() //id do usuario clicado
    const [dados,setDados] = useState([]) //dados do usuario clicado
    const [posts,setposts] = useState([]) //posts do usuario clicado
    const [TempArray,setTempArray] = useState([]) //seguidores do usuario clicado

    const {dadosSessao} = useContext(FeedContext)

    const [zoomFT,setZoomFT] = useState(false) // define a montagem do componente de janela modal
    const [legendaSeg,setLegendaSeg] = useState('') //legenda que mostra se o usuario ja segue o outro

    useEffect(() => {

        async function AtivaUse() {
            const resp = await OutroUSer({id})
            if(resp){
                setDados(resp)
                setTempArray(resp.seguidores)
            }

            const res = await FeedUser({id})
            if(res){
                setposts(res)
            }
        }
        AtivaUse()
    
    },[id])

    useEffect(() => {
        
    if(!dadosSessao.res?._id) return

    const sera = TempArray.some( //checa se o id do usuario da sessao esta no array de seguidores do usuario clicado
        item => item.IDseguidor === dadosSessao.res?._id
    )

    setLegendaSeg(sera ? 'Seguindo...' : '+Seguir')

    },[TempArray,dadosSessao.res?._id])

    function DeixarDeSeguir(){
        
        setTempArray(prev => 
            prev.filter(item => item.IDseguidor !== dadosSessao.res?._id) //se eu ja seguir a pessoa, sou removido do array temporario
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
            if(prev.some(item => item.IDseguidor === dadosSessao.res?._id)) return prev
            return [...prev,{IDseguidor:dadosSessao.res?._id,nameSeguindo:dadosSessao.res?.name,urlFoto:dadosSessao.res?.fotoPerfil}] //impede de duplicar com clique duplo
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
            item  => item.IDseguidor === dadosSessao.res?._id
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
                    <FeedDePosts Posts={posts} name={dadosSessao.res?.name} Foto={dadosSessao.res?.foto} />
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