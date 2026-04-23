export default async function FetchRegister({formData}){

    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/register`,{
        method:"POST",
        body:formData
    })

    if(!res.ok) throw new Error('Erro no fetch')

    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
}
