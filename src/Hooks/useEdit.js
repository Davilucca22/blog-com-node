import { toast } from "react-toastify"
import FetchEdit from "../APIs/fetchEdit.js"

export default function useEdit(){
    async function Editar({formdata}){
        try{
            const resp = await FetchEdit({formdata})
            return resp
        }catch(e){
            toast.error('Falha')
            console.log(e)
        }
    }

    return {Editar}
}
