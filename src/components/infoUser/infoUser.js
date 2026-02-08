import { useEffect, useState } from "react";
import "./infoUser.css"

export default function InfoUser({objDados, Arrseguindo}){
    const [dados,setDados] = useState(objDados || [])
    const [arraySeguidores,setSeguidores] = useState(Arrseguindo || [])

    useEffect(() => {
        setDados(objDados || [])
        setSeguidores(Arrseguindo || [])
    },[objDados,Arrseguindo])

    return( 
        <div>
            <section id="bio">
                <div id="infoUser">
                    <div id="contadores">
                        <img src={dados.fotoPerfil} alt="sem foto"></img>
                        <div id="textos">
                            <span id="nomeP">{dados.name}</span>
                            <div id="legendas">
                                <div className="info">
                                    <span>{dados.posts?.length ?? 0}</span>{/*se encontrar o array post, retorna o tamanho, senao retorna 0*/}
                                    <span>Posts</span>
                                </div>
                                <div className="info">
                                    <span>{dados.seguindo?.length ?? 0}</span>
                                    <span>Seguindo</span>
                                </div>
                                <div className="info">
                                    {arraySeguidores.length !== 0 &&
                                        <span>{arraySeguidores.length ?? 0}</span>
                                    }
                                    {arraySeguidores.length === 0 &&
                                        <span>{dados.seguidores?.length ?? 0}</span>
                                    }
                                    <span>Seguidores</span>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <p>{dados.biografia}</p>
                </div>
            </section>
        </div>
    )
}