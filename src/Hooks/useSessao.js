import { useContext } from "react";
import { FeedContext } from "../context/FeedContext.js";
import FetchSessao from "../APIs/fetchSessao.js"

export function USeSessao(){

    const {setDadosSessao} = useContext(FeedContext)

    async function Sessao(){
        try{
            const res = await FetchSessao()
            setDadosSessao({res})
        }catch(e){
            console.log('erro:', e)
        }
    }

    return { Sessao }
}