import { toast } from "react-toastify"
import FetchSeguir from "../APIs/fetchSeguir"

export default function useSeguir(){
    async function SeguirUser({id,nome,fotoPerfil}){
        try{
            await FetchSeguir({id,nome,fotoPerfil})
        }catch(e){
            toast('Erro ao Seguir')
            console.log(e)
        }
    }

    return {SeguirUser}
}