import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModal from "./UserLoginModal";
import toast from "react-hot-toast";
import axios from "axios";

const useLike=({postId,userId}:{postId:string,userId?:string})=>{
    const {data:currentUser}=useCurrentUser();
    const {data:fetchedPost,mutate :mutateFetchedPost}=usePost(postId);
    const {mutate:mutateFetchedPosts}=usePosts(userId);

    const loginModal =useLoginModal();
    const hasLike = useMemo(()=>{
        console.log(fetchedPost)
        const list = fetchedPost?.likedIds||[];
        return list.includes(currentUser?.id);
    },[currentUser?.id,fetchedPost?.likedIds]);

    const toggleLike=useCallback(async()=>{
if(!currentUser){
   return loginModal.onOpen();
}
try {
    let request ;
    if(hasLike){
        request =()=>axios.delete(`/api/like`,{data:{postId,userId:currentUser?.id}})
    }
    else{
        request =()=>axios.post(`/api/like`,{postId,userId:currentUser?.id})

    }
    await request();
    mutateFetchedPost();
    mutateFetchedPosts();
    // toast.success("")

} catch (error) {
    
    toast.error("Something Went Wrong")
}
    },[currentUser,hasLike,postId,mutateFetchedPost,mutateFetchedPosts,loginModal]);
    return {
        hasLike,toggleLike
    }
}
export default useLike