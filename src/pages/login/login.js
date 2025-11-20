import { React, useState} from "react"
import "./login.css"

export default function Login(){
    return(
        <main>
            <section id="bemVindo">
                <h1>
                    <span className="preto">BEM</span>
                    <span className="branco" >VINDO</span>
                    <span className="preto">DE</span>
                    <span className="branco1">VOLTA</span>
                </h1>
            </section>
            <section id="form">
                <input type="email" placeholder="SEU EMAIL..."></input>
                <input type="password" placeholder="SUA SENHA..."></input>
                <button id="entrar_1">ENTRAR</button>
                <span>ESQUECI MINHA SENHA</span>
            </section>
        </main>
    )
}