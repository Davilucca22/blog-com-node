import React from "react";
import './style.css'
import { Link } from "react-router-dom";

export default function BoasVindas(){
    return(
        <main id="conteinerInicial">
            <section id="Texto">
                <h1>
                    <span className="titulo">SEJA</span> 
                    <span id="BEM" className="titulo">BEM</span> 
                    <span className="titulo">VINDO</span>
                </h1>
                <p id="paragrafo">
                    Crie postagens incriveis, compartilhe experiencias e interaja com diversas pessoas
                </p>
            </section>
            <section id="conteinerBTN">
                <button className="botao" id="comecar"><Link to={'/register'}>COMEÇAR AGORA</Link></button>
                <span id="jaConta">JA TEM UMA CONTA?</span>
                <button className="botao" id="entrar"><Link to={'/login'}>ENTRAR</Link></button>
            </section>
        </main>
    )
}