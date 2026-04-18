import { toast } from "react-toastify";
import { FetchComentario } from "../APIs/fetchComentario";

export function useComentario(){
    async function Comentar({IDpost,nome,foto,comentario}){
        try{
            await FetchComentario({IDpost,nome,foto,comentario})
            toast.success('comentou')
        }catch(e){
            toast.error("Erro ao comentar")
            console.log(e)
        }
    }
    return {Comentar}
}