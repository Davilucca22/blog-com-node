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

    function fecharModal(){
        setMudaclasse(true)
        setTimeout(() => {
            setMudaclasse(false)
            if(Ver){
                DevolveProPai(false)
                setVer(false)
            }
        },300)
    }

    return( 
        <>
            {Ver && (
                <>
                    <div className={`modal-overlay-bg ${mudaClasse ? 'closing' : ''}`} onClick={fecharModal}></div>
                    <aside className={mudaClasse ? "conteinerModalAtivo" :"conteinerModal"}>
                        <div id="divaleatoria">
                            <GoX id="sair" onClick={fecharModal} />
                        </div>
                        <ul id="listaPublico">
                            {Pub.map((pessoa, index) => (
                                <li className="pessoa" key={index} onClick={() => {
                                    telaUser(pessoa.IDseguindo || pessoa.IDseguidor)
                                    fecharModal()
                                }}>
                                    <img className="imgSeg" src={pessoa.urlFoto || "https://via.placeholder.com/150"} alt="foto de perfil do usuario"></img>
                                    <span>{pessoa.nameSeguindo || pessoa.nameSeguidor}</span>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </>
            )}
        </>
    )
}