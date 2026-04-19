import { getAuthHeaders } from './auth.js';

export async function FetchComentario({IDpost,nome,foto,comentario}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/comentario`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            ...getAuthHeaders()
        },
        body:JSON.stringify({
            IDpost,
            nome,
            foto,
            comentario
        })
    })

    if(!res.ok) throw new Error("Erro no banco de dados")

    return res.json()
}