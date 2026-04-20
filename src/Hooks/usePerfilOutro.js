import { useCallback } from "react";
import FetchOutroUser from "../APIs/fetchPerfilOutro";

export function usePerfilOutro(){
    
    const OutroUSer = useCallback(async ({id}) => {
        try{
            const resp = await FetchOutroUser({id})
            return resp
        }catch(e){
            console.log(e)
        }
    },[])

    return {OutroUSer}
}