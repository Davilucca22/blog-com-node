import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./deleta.css"

export default function DeletaPost({postID, retorna}){
    const [IdPost,setPost] = useState(postID || '')

    useEffect(() => {
        setPost(postID || '')
    },[postID])

    async function DeletarPost(){
        try{
            fetch(`${process.env.REACT_APP_URL_SITE}/Delete`,{
                method:"DELETE",
                credentials:"include",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    IDpost:IdPost
                })
            }).then(res => res.json())
            .then(resp => {
                toast.success(resp.msg)
                setInterval(() => {
                    window.location.reload()
                },1000)
            })
        }catch(e){
            toast.error(e)
        }
    }

    return(
        <section id="conteinerDel">
            <div id="modalDel">
                <h3 id="h3Del">Deletar Post?</h3>
                <button onClick={DeletarPost} id="confirmDel">Sim</button>
                <button id="NegaDel" onClick={() => retorna()}>Nao</button>
            </div>
        </section>
    )
}
