export default async function FetchFeedUser({id}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/feedUser/${id}`,{
        method:"GET",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        }
    })

    if(!res.ok) throw new Error("Erro ao buscar posts do usuario")

    return res.json()
}