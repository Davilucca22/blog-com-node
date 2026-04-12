import FetchOutroUser from "../APIs/fetchPerfilOutro";

export default function usePerfilOutro(){
    
    async function OutroUSer({id}){
        try{
            const resp = await FetchOutroUser({id})
            return resp
        }catch(e){
            console.log(e)
        }
    }

    return {OutroUSer}
}