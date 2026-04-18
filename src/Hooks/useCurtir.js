import { toast } from "react-toastify";
import { FetchCurtir } from "../APIs/fetchCurtir";

export function useCurtir(){
    async function Curtida({PostID, UserID}){
        try{
            await FetchCurtir({PostID,UserID})
        }catch(e){
            console.log(e)
        }
    }

    return {Curtida}
}
