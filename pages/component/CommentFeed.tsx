import React from "react";
import CommentItem from "./CommentItem";

interface CommentFeedProps{
    comments?:Record<string,any>
}
const CommentFeed:React.FC<CommentFeedProps>=({comments})=>{
return(
    <>
    {
    
    comments && comments.map((comment:any)=>(
<CommentItem key={comment.id}  data={comment}/>
        ))
    }
    </>
)
}
export default CommentFeed;