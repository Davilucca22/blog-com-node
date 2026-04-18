import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDeleta } from "../../Hooks/useDeleta.js";
import "./Deleta.css"

export default function DeletaPost({postID, retorna}){
    const [IdPost,setPost] = useState(postID || '')
    const {Deletar} = useDeleta()

    useEffect(() => {
        setPost(postID || '')
    },[postID])

    async function DeletarPost(){

        const resp = await Deletar({IdPost})
    
        if(resp){
            toast.success(resp.msg)
            setInterval(() => {
                window.location.reload()
            },1000)
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