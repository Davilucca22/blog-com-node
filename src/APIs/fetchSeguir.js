import { getAuthHeaders } from './auth.js';

export default async function FetchSeguir({IdOutro,nameSeguindo,urlFoto}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/Seguir`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            ...getAuthHeaders()
        },
        body:JSON.stringify({
            IdOutro,
            nameSeguindo,
            urlFoto
        })
    })

    if(!res.ok) throw new Error("Erro ao deixar de seguir")

    return res.json()

}