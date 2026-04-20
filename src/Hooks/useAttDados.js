import { toast } from "react-toastify"
import { FetchAtt } from "../APIs/fetchAttDados"
import { useCallback } from "react"

export function useAttDados(){
    const AttDados = useCallback(async ({postagens}) => {
        try{
            const res = await FetchAtt({postagens})
            return res
        }catch(e){
            toast.error('Erro na Requisição')
        }
    },[])

    return {AttDados}
}
