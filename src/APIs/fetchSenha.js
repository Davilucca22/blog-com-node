import { getAuthHeaders } from './auth.js';

export default async function FetchSenha({ senhaAtual, senhaNova }) {
    const res = await fetch(`${process.env.REACT_APP_URL_SITE}/editsenha`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify({
            senhaAtual,
            senhaNova
        })
    })

    if (!res.ok) throw new Error('Falha ao atualizar senha')

    return res.json()
}
