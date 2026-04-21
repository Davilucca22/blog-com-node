import { toast } from "react-toastify"
import FetchSeguir from "../APIs/fetchSeguir"

export function useSeguir(){
    async function SeguirUser({IdOutro,nameSeguindo,urlFoto}){
        try{
            await FetchSeguir({IdOutro,nameSeguindo,urlFoto})
        }catch(e){
            toast('Erro ao Seguir')
            console.log(e)
        }
    }

    return {SeguirUser}

} 