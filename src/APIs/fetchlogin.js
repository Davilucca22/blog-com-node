export default async function FetchLogin({email, senha}){

    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/login`,{
        method:"POST",
        credentials:'include',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            senha
        })
    })

    if(!res.ok) throw new Error('Falha no Login')

    return res.json()
}
