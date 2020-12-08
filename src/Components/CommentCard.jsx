import moment from "moment";
import { VscChevronUp, VscChevronDown } from "react-icons/vsc";
function CommentCard({ comments }) {
  return (
    <ul className="comment-list">
      {comments.map((comment) => {
        return (
          <li key={comment.comment_id}>
            <div className="comment-body">
              <p>
                <strong>{comment.author}</strong>: {comment.body}
              </p>
              <p>{moment(`${comment.created_at}`, "YYYYMMDDHH").fromNow()}</p>
            </div>
            <div className="comment-votes">
              <p>
                <VscChevronUp />
              </p>
              <p>{comment.votes}</p>
              <p>
                <VscChevronDown />
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
export default CommentCard;
