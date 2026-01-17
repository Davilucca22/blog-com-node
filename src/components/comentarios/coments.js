import react, { useEffect, useState } from "react";
import './coment.css'

export default function Coment({ data, IDpost }) {

    const [dados, setdados] = useState(data || [])
    const [ID, setid] = useState(IDpost || '')

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:3000/attdados', {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dados
                })
            }).then(res => res.json())
                .then(resp => setdados(resp) )
        }, 5000);

        return () => clearInterval(interval)

    }, [dados])

    return (
        <dl id="comentarios">
            {dados.map(val => (
                <div>
                { ID === val.post._id && //renderiza os comentarios de um post especifico
                val.post.comentarios?.map(item => (
                    <div className="contComentario">
                        <img className="fotoDono" src={item.fotoDono} alt="foto do dono do comentario"></img>
                        <div className="infoComent">
                            <dt className="user">{item.donoComentario}</dt>
                            <dd className="usercoment">{item.textoComentario}</dd>
                        </div>
                    </div>
                ))
                    }
            </div>
            ))
            }
        </dl>
    )
}