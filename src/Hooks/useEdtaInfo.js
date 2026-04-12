import { toast } from "react-toastify";
import FetchEditInfo from "../APIs/fetchEditaInfo";

export default function useEditInfo(){
    async function EditaInfo({dataNasc, email}){
        const res = await FetchEditInfo({dataNasc, email})

        if(res.msg){
            toast.success(res.msg)
        }else{
            toast.error(res.erro)
        }
    }

    return {EditaInfo}
}