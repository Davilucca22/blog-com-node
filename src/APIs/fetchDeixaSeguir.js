import { getAuthHeaders } from './auth.js';

export default async function FetchDeixaSeguir({id}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/DeixarDeSeguir`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            ...getAuthHeaders()
        },
        body:JSON.stringify({
            IdOutro:id
        })
    })

    if(!res.ok) throw new Error("Erro ao deixar de seguir")

    return res.json()

}