import { getAuthHeaders } from './auth.js';

export default async function FetchEditInfo({dataNasc, email}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/editinfo`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            ...getAuthHeaders()
        },
        body:JSON.stringify({
            email,
            dataNasc
        })
    })

    if(!res.ok) throw new Error('Erro ao atualizar informaçoes do usuario')

    return res.json()
}