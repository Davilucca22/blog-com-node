import { getAuthHeaders } from './auth.js';

export default async function FetchSeguir({id,nome,fotoPerfil}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/Seguir`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            ...getAuthHeaders()
        },
        body:JSON.stringify({
            IdOutro:id,
            nameSeguindo:nome,
            urlFoto:fotoPerfil
        })
    })

    if(!res.ok) throw new Error("Erro ao deixar de seguir")

    return res.json()

}