import { getAuthHeaders } from './auth.js';

export async function FetchCurtir({PostID,UserID}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/curtida`,{
        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        },
        body:JSON.stringify({
            PostID,
            UserID
        })
    })

    if(!res.ok) throw new Error("Erro no Banco de Dados")

    return res.json()

}