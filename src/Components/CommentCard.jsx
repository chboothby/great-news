import moment from "moment";

import styles from "../Styles/Comments.module.css";
import CommentVotes from "./CommentVotes";

function CommentCard({ comments }) {
  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.comment_id} className={styles.commentCard}>
            <div className={styles.commentBody}>
              <p>
                <strong>{comment.author}</strong>: {comment.body}
              </p>
              <p>{moment(`${comment.created_at}`, "YYYYMMDDHH").fromNow()}</p>
            </div>
            <CommentVotes comment={comment} />
          </li>
        );
      })}
    </ul>
  );
}
export default CommentCard;
