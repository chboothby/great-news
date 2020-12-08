import moment from "moment";
import { VscChevronUp, VscChevronDown } from "react-icons/vsc";
import styles from "../Styles/Comments.module.css";

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
            <div className={styles.commentVotes}>
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
