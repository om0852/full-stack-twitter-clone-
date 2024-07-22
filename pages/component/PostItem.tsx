import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import useLoginModal from "./hooks/UserLoginModal";
import useCurrentUser from "./hooks/useCurrentUser";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "./Avatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineLike, AiOutlineMessage } from "react-icons/ai";
import useLike from "./hooks/useLike";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}
const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
const {hasLike,toggleLike}=useLike(({postId:data.id,userId})) ;
console.log(hasLike)
  const { data: currentUser } = useCurrentUser();
  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data?.user?.id]
  );
  const goToPost = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`/post/${data.id}`);
    },
    [router, data?.id]
  );
  const onLike = useCallback(
    (e: any) => {
      e.stopPropagation();
      if(!currentUser){
       return loginModal.onOpen();
      }
      toggleLike();
    },
    [toggleLike,loginModal]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);
  return (
    <>
      <div
        className="post-item 
        border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition
        "
        onClick={goToPost}
      >
        <div className="flex flex-row items-start gap-3">
          <Avatar userId={data.userId} />
          <div>
            <div className="flex flex-row items-center gap-2">
              <p
                onClick={goToPost}
                className="text-white font-semibold cursor-pointer hover:underline"
              >
                {data.user.name}
              </p>
              <span
                onClick={goToUser}
                className="text-neutral-200 cursor-pointer hover:underline hidden md:block"
              >
                {data.user.username}
              </span>
              <span className="text-neutral-500 text-sm">{createdAt}</span>
            </div>
            <div className="text-white mt-1">{data.body}</div>
            <div className="flex flex-row items-center mt-3 gap-10">
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                <AiOutlineMessage size={20} />
                <p>{data.comments?.length||0}</p>
              </div>
              {!hasLike ? <div onClick={onLike} className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <AiOutlineHeart size={20} />
                <p>{data.likedIds?.length||0}</p>
              </div> : <div onClick={onLike} className="flex flex-row items-center text-red-500 gap-2 cursor-pointer transition hover:text-red-500">
                <AiFillHeart size={20} />
                <p>{data.likedIds?.length||0}</p>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostItem;
