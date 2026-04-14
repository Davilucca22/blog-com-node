export default async function FetchPostar({formadata}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/postar`,{
        method:"PUT",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:formadata
    })

    if(!res.ok) throw new Error('erro ao enviar Post')

    return res.json()
}