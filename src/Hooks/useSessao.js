import { useCallback, useContext } from "react";
import { FeedContext } from "../context/FeedContext.js";
import FetchSessao from "../APIs/fetchSessao.js"

export function useSessao(){

    const {setDadosSessao} = useContext(FeedContext)

    const Sessao = useCallback(async () => {
        try{
            const res = await FetchSessao()
            setDadosSessao({res})
        }catch(e){
            console.log('erro:', e)
        }
    },[setDadosSessao])

    return { Sessao }
}
