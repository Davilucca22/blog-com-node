export default async function FetchRegister({formData}){

    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/register`,{
        method:"POST",
        credentials:"include",
        body:formData
    })

    if(!res.ok) throw new Error('Erro no fetch')

    return res.json()
}
