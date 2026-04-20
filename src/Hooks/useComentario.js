import { FetchComentario } from "../APIs/fetchComentario";

export function useComentario(){
    async function Comentar({IDpost,nome,foto,comentario}){
        try{
            await FetchComentario({IDpost,nome,foto,comentario})
        }catch(e){
            console.log(e)
        }
    }
    return {Comentar}
}
