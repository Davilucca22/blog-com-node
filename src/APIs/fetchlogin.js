export default async function FetchLogin({email, senha}){

    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            senha
        })
    })

    if(!res.ok) throw new Error('Falha no Login')

    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
}
