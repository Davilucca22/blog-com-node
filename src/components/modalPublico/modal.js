import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { GoX } from "react-icons/go";
import './modal.css'

export default function Modal({publico, verModal, DevolveProPai}){

    const [Pub,setPub] = useState(publico || [])
    const [Ver,setVer] = useState(verModal || false)
    const [mudaClasse,setMudaclasse] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setPub(publico || [])
        setVer(verModal || false)
    },[publico,verModal])

    function telaUser(id) {
        navigate(`/details/${id}`)
    }

    function TrataDevolverProPai(){
        if(Ver){
            DevolveProPai(false)
            setVer(false)
        }
    }

    return(
        <aside >
        {Ver &&
            <nav className={mudaClasse ? "conteinerModalAtivo" :"conteinerModal"}>
                <div id="divaleatoria">
                    <span onClick={() => {
                        setMudaclasse(true)
                        setTimeout(() => {
                            setMudaclasse(false)
                            TrataDevolverProPai()
                        },300)
                    }}><GoX id="sair" /></span>
                    {Pub[0].nameSeguidor  &&
                        <h3 className="tituloSeg">Seguidores</h3>
                    }
                    {Pub[0].nameSeguindo  &&
                        <h3 className="tituloSeg">Seguindo</h3>
                    }
                </div>
                <ul id="listaPublico">
                    {Pub.map(pessoa => (
                        <li key={pessoa.IDseguindo || pessoa.IDseguidor} className="pessoa">
                            <img className="imgSeg" src={pessoa.urlFoto} alt="foto de perfil do usuario"></img>
                            <span onClick={() => {
                                telaUser(pessoa.IDseguindo || pessoa.IDseguidor)
                                TrataDevolverProPai()
                        }}>{pessoa.nameSeguindo || pessoa.nameSeguidor}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        }
       </aside> 
    )
}