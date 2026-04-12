import FetchFeedUser from "../APIs/fetchFeedUser";

export default function useFeedUser(){
    async function FeedUser({id}){
        try{

            const res = await FetchFeedUser({id})
            return res

        }catch(e){
            console.log(e)
        }
    }

    return {FeedUser}

}