export default async function FetchOutroUser({id}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/perfiloutro/${id}`,{
        method:"GET",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        }
    })

    if(!res.ok) throw new Error("Erro ao buscar dados do usuario")

    return res.json()
}