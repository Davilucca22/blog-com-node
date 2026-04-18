import { createContext, useState, useEffect } from "react";

export const FeedContext = createContext()

export function FeedProvider({children}){
    const [dados, setDados] = useState([]) //dados passados em useFeed.js
    const [dadosSessao,setDadosSessao] = useState({}) // <- Alterado de [] para {}
    const [darkTheme, setDarkTheme] = useState(() => {
        // Carrega o tema do localStorage, padrão false
        const savedTheme = localStorage.getItem('darkTheme');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        // Salva o tema no localStorage sempre que muda
        localStorage.setItem('darkTheme', JSON.stringify(darkTheme));
    }, [darkTheme]);

    return(
        <FeedContext.Provider value={{dados, setDados, darkTheme, setDarkTheme, dadosSessao, setDadosSessao}}>
            {children}
        </FeedContext.Provider>
    )
}
