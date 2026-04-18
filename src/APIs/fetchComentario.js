export async function FetchComentario({IDpost,nome,foto,comentario}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/comentario`,{
        method:"PUT",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            IDpost,
            nome,
            foto,
            comentario
        })
    })

    if(!res.ok) throw new Error("Erro no banco de dados")

    return res.json()
}