export default async function FetchBusca({nome}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/buscar?nome=${nome}`,{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        })

    if(!res.ok) throw new Error('Erro ao buscar usuario')    

    return res.json()
}