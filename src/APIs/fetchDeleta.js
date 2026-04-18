export async function FetchDeleta({IdPost}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/Delete`,{
        method:"DELETE",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            IDpost:IdPost
        })
    })

    if(!res.ok) throw new Error("Erro no lado Servidor")

    return res.json()

}