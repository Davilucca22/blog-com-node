import { getAuthHeaders } from './auth.js';

export default async function FetchSessao(){

    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/session`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            ...getAuthHeaders()
        }
    })

    if(!res.ok) throw new Error("Erro ao buscar dados da sessao")

    return res.json()
}