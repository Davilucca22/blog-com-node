import { useCallback, useContext } from "react";
import FetchFeed from "../APIs/fetchFeed";
import { FeedContext } from "../context/FeedContext";

export function useFeed(){

    const {setDados} = useContext(FeedContext)

    const Feed = useCallback(async () => {
        try{
            const resp = await FetchFeed()

            if(resp){
                setDados(resp)
            }
        }catch(e){
            console.log(e)
        }
    },[setDados])

    return {Feed}
}