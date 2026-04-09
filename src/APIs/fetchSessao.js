export default async function FetchSessao(){

    const el = await fetch(`${process.env.REACT_APP_URL_SITE}/session`,{
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        }
    })

    if(!el.ok) throw new Error("Erro ao buscar dados da sessao")

    return el.json()
}