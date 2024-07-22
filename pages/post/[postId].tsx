import { useRouter } from "next/router"
import usePost from "../component/hooks/usePost";
import { ClipLoader } from "react-spinners";
import Header from "../component/Header";
import PostItem from "../component/PostItem";
import Form from "../component/Form";
import CommentFeed from "../component/CommentFeed";
import { useEffect } from "react";

const PostView=()=>{
  const router = useRouter();
  const {postId}=  router.query;

  const {data:fetchedPost,isLoading}=usePost(postId as string);
useEffect(()=>{

  console.log(fetchedPost)
},[fetchedPost])
  if(isLoading||!fetchedPost){
    return(
      <div className="flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80}/>
    </div>
    )
  }
  return (
    <>
   <Header label="Tweet" showBackArrow/>
   <PostItem data={fetchedPost}/>
   <Form postId={postId as string} isComment placeholder="Tweet Your Reply"/>
   <CommentFeed comments={fetchedPost?.comments}/>
    </>
  )
}
export  default PostView