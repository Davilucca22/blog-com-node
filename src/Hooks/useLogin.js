import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FeedContext } from "../context/FeedContext";
import FetchLogin from "../APIs/fetchlogin";

export function useLogin(){
    const navigate = useNavigate();
    const { setDadosSessao } = useContext(FeedContext);

    async function login({email, senha}) {
        try{
            const res = await FetchLogin({email,senha});  

            if(res.token){
                // Armazenar dados da sessão
                setDadosSessao(res.user || res);
                toast.success(res.msg || 'Login realizado com sucesso');
                navigate('/feed',{replace:true});
            }else{
                toast.error(res.msgerr || 'Erro no login');
            }
        }catch(e){
            toast.error('Falha no Login!');
        }
    }

    return { login };
}
