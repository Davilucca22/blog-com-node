import { getAuthHeaders } from './auth.js';

export async function FetchDeleta({IdPost}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/Delete`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            ...getAuthHeaders()
        },
        body:JSON.stringify({
            IDpost:IdPost
        })
    })

    if(!res.ok) throw new Error("Erro no lado Servidor")

    return res.json()

}