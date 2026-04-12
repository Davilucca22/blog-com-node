import { useContext } from "react";
import FetchFeed from "../APIs/fetchFeed";
import { FeedContext } from "../context/FeedContext";

export default function UseFeed(){

    const {setDados} = useContext(FeedContext)

    async function Feed(){
        try{
            const resp = await FetchFeed()

            if(resp){
                setDados(resp)
            }
        }catch(e){
            console.log(e)
        }

    }

    return {Feed}
}