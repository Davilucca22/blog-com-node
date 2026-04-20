import { useCallback } from "react";
import FetchFeedUser from "../APIs/fetchFeedUser";

export function useFeedUser(){
    const FeedUser = useCallback(async ({id}) => {
        try{

            const res = await FetchFeedUser({id})
            return res

        }catch(e){
            console.log(e)
        }
    },[])

    return {FeedUser}

}