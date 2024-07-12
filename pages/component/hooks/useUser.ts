import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUser = (userid:string) => {
    const { data, error, isLoading, mutate } = useSWR(userid?`/api/users/${userid}`:null, fetcher);
    console.log(data);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};
export default useUser;
