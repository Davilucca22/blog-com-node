export default async function FetchSeguir({id,nome,fotoPerfil}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/Seguir`,{
        method:"PUT",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
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