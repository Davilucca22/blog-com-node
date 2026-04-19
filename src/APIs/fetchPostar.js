import { getAuthHeaders } from './auth.js';

export default async function FetchPostar({formadata}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/postar`,{
        method:"PUT",
        headers:{
            ...getAuthHeaders()
        },
        body:formadata
    })

    if(!res.ok) throw new Error('erro ao enviar Post')

    return res.json()
}