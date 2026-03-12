import { createContext, useState } from "react";

export const FeedContext = createContext()

export function FeedProvider({children}){
    const [dados, setDados] = useState([])

    return(
        <FeedContext.Provider value={{dados, setDados}}>
            {children}
        </FeedContext.Provider>
    )
}