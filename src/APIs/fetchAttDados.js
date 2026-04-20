import { getAuthHeaders } from './auth.js';

export async function FetchAtt({postagens}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/attdados`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            ...getAuthHeaders()
        },
        body:JSON.stringify({
            postagens
        })
    })

    if(!res.ok) throw new Error('Erro ao pegar dados do servidor')

    return res.json()

}
