import { toast } from "react-toastify"
import FetchPostar from "../APIs/fetchPostar"

export function usePostar(){
    async function Postar({formadata}){
        try{
            const res = await FetchPostar({formadata})
            if(res){
                return res
            } 
        }catch(e){
            toast.error('erro ao postar foto')
            console.log(e)
        }
    }

    return {Postar}
}