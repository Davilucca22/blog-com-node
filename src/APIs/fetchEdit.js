export default async function FetchEdit({formdata}){
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/editperfil`,{
        method:"PUT",
        credentials:"include",
        body:formdata
    })

    if(!res.ok) throw new Error('Erro ao Editar dados')

    return res.json()
}