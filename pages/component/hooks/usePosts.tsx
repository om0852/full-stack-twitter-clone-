import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePosts = (userid?:string) => {
    let url =userid?`/api/posts?userId=${userid}`:`/api/posts`;
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);
    // console.log(data);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};
export default usePosts;
