import { toast } from "react-toastify";
import FetchBusca from "../APIs/fetchBusca";
import { useCallback } from "react";

export function useBusca(){
    const Busca = useCallback(async ({nome}) => {
        try{
            const res = await FetchBusca({nome})
            return res
        }catch(e){
            toast.error('erro ao buscar usuario')
        }
    },[])

    return {Busca}
}