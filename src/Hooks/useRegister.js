import { toast } from "react-toastify";
import FetchRegister from "../APIs/fetchRegister.js";
import { useNavigate } from "react-router-dom";
import { FeedContext } from "../context/FeedContext.js";
import { useContext } from "react";

export function useRegister(){
    const navigate = useNavigate()
    const { setDadosSessao } = useContext(FeedContext)

    async function Register({formData}) {
        try{
            const res = await FetchRegister({formData})

            if(res.token){
                setDadosSessao(res.user || res)
                toast.success(res.msg || 'Conta Criada com Sucesso')
                navigate('/feed',{replace:true})
            }else{
                toast.error(res.msgerr || 'Erro ao Criar Conta')
                return
            }

        }catch(e){
            toast.error("Erro ao criar usuario")
            console.log(e)
        }
    }
    return { Register }
}
