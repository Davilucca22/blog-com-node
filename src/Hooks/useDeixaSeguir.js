import { toast } from "react-toastify"
import FetchDeixaSeguir from "../APIs/fetchDeixaSeguir"

export function useDeixaSeguir(){
    async function DeixaSeguir({id}){
        try{
            const res = await FetchDeixaSeguir({id})
            if(res){
                console.log(res.msg)
            }
        }catch(e){
            toast.error("Erro ao deixar de seguir")
            console.log(e)
        }
    }

    return {DeixaSeguir}
}