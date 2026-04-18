export async function FetchAtt({postagens}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/attdados`,{
        method:"PUT",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            postagens
        })
    }) 

    if(!res.ok) throw new Error('Erro ao pegar dados do servidor')

    return res.json()

}