import { getAuthHeaders } from './auth.js';

export default async function FetchFeed(){

    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/feed?page=1`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            ...getAuthHeaders()
        }
    })

    if(!res.ok) throw new Error('Erro ao buscar posts do feed')

    return res.json()

}