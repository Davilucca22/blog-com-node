import { toast } from "react-toastify";
import FetchSenha from "../APIs/fetchSenha";

export default function useEditSenha(){

    async function AttSenha({senhaAtual,senhaNova}){
        try{
            
            const resp = await FetchSenha({senhaAtual,senhaNova})

            if(resp.msg){
                toast.success(resp.msg)
            }else{
                toast.error(resp.erro)
            }

        }catch(e){
            console.log(e)
            toast.error("Erro ao atualizar senha!")
        }

    }

    return { AttSenha }

}