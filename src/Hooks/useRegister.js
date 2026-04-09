import { toast } from "react-toastify";
import FetchRegister from "../APIs/fetchRegister.js";
import { useNavigate } from "react-router-dom";

export function useRegister(){
    const navigate = useNavigate()

    async function Register({formData}) {
        try{
            const res = await FetchRegister({formData})

            if(res.msg){
                toast.success(res.msg)
                navigate('/feed',{replace:true})
            }else{
                toast.error(res.msgerr)
                return res.msgerr
            }

        }catch(e){
            toast.error("Erro ao criar usuario")
            console.log(e)
        }
    }
    return { Register }
}
