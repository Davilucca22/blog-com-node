export default async function FetchSenha({ senhaAtual, senhaNova }) {
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/editsenha`, {
        method: "PUT",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            senhaAtual,
            senhaNova
        })
    })

    if (!res.ok) throw new Error('Falha ao atualizar senha')

    return res.json()
}
