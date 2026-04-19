import { getAuthHeaders } from './auth.js';

export default async function FetchFeedUser({id}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/feedUser/${id}`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            ...getAuthHeaders()
        }
    })

    if(!res.ok) throw new Error("Erro ao buscar posts do usuario")

    return res.json()
}