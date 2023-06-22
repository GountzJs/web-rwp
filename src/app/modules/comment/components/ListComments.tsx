import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { ICommentSchema } from "../../shared/models/schemas/comment.schema";
import { RootState } from "../../shared/redux/store";
import { FormComment } from "../forms/FormComment";
import { getCommentsService } from "../services/getCommentsService";
import { Comment } from "./Comment";

export function ListComments({ slug }: { slug: string }) {
  const isLogin = useSelector((state: RootState) => state.auth.value);
  const user = useSelector((state: RootState) => state.user.value);
  const [comments, setComments] = useState<ICommentSchema[]>([]);
  const unlogged = UnLoggedHook();

  useEffect(() => {
    getCommentsService(slug)
      .then(res => setComments(res.comments))
      .catch(err => {
        if(err?.message === 'missing authorization credentials') unlogged();
      })
  }, [])

  const addComment = (cmt: ICommentSchema) => setComments([cmt, ...comments]);

  const removeComment = (idComment: number) => setComments(comments.filter(({ id }) => id !== idComment ));

  return (
    <>
      <div className="col-xs-12 col-md-8 offset-md-2">
        { isLogin && user?.image && <FormComment slug={slug} addComment={addComment} image={user.image} /> }
        { 
          comments.map((comment, idx: number) => 
            <Comment key={idx} slug={slug} comment={comment} username={user?.username} removeComment={removeComment} />
          )
        }
      </div>
    </>
  )
}