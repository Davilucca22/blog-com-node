import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FetchLogin from "../APIs/fetchlogin";

export function useLogin(){
    const navigate = useNavigate()

    async function login({email, senha}) {
        try{
            const res = await FetchLogin({email,senha})

            if(res.msg){
                toast.success(res.msg)
                navigate('/feed',{replace:true})
            }else{
                toast.error(res.msgerr)
            }
        }catch(e){
            toast.error('Falha no Login!')
        }

    }
    return { login }
}
