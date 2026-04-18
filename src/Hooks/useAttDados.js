import { toast } from "react-toastify"
import { FetchAtt } from "../APIs/fetchAttDados"

export function useAttDados(){
    async function AttDados({postagens}){
        try{
            const res = await FetchAtt({postagens})
            return res
        }catch(e){
            toast.error('Erro na Requisição')
        }
    }

    return {AttDados}
}
