import useSWR from "swr";
import fetcher from "@/libs/fetcher";
//swap the name of usePosts and usePost in terms of functionality
const usePost = (postId?:string) => {
    // alert(postId)
    let url =`/api/posts/${postId}`;
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);
    console.log(data);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};
export default usePost;
