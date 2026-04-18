import { toast } from 'react-toastify'
import {FetchDeleta} from '../APIs/fetchDeleta'

export function useDeleta(){
    async function Deletar({IdPost}){
        try{
            const res = await FetchDeleta({IdPost})
            return res
        }catch(e){
            toast.error("Erro ao deletar Post")
            console.log(e)
        }
    }

    return {Deletar}
}