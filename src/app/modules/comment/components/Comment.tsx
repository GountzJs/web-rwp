import moment from "moment";
import { Link } from "react-router-dom";
import { BtnDeleteComment } from "../actions/BtnDeleteComment";
import { IComment } from "../models/interfaces/comment.interface";

export function Comment({ slug, comment, username, removeComment }: IComment) {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">
          { comment.body }
        </p>
      </div>
      <div className="card-footer">
        <Link 
          to={`/profile/${comment.author.username}`} 
          className="comment-author"
        >
          <img src={comment.author.image} className="comment-author-img" />
        </Link>
        &nbsp;
        <Link 
          to={`/profile/${comment.author.username}`} 
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">{ moment(comment.createdAt).format('MMMM D, YYYY') }</span>
        {
          username === comment.author.username &&
          <BtnDeleteComment slug={slug} id={comment.id} removeComment={removeComment} />
        }
      </div>
    </div>  
  )
}