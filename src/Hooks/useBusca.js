import { toast } from "react-toastify";
import FetchBusca from "../APIs/fetchBusca";

export function useBusca(){
    async function Busca({nome}){
        try{
            const res = await FetchBusca({nome})
            return res
        }catch(e){
            toast.error('erro ao buscar usuario')
        }
    }

    return {Busca}
}