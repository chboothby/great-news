import moment from "moment";
import { removeComment } from "../api";
import styles from "../Styles/Comments.module.css";
import CommentVotes from "./CommentVotes";
import { useContext } from "react";
import { UserContext } from "../App";
import Popup from "reactjs-popup";

function CommentCard({ comments, deleteComment }) {
  const { username } = useContext(UserContext);
  const handleClick = (id) => {
    removeComment(id)
      .then(() => {
        deleteComment(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
              {comment.author === username ? (
                <Popup
                  trigger={
                    <button className={styles.deleteBtn}>
                      {" "}
                      Delete your comment{" "}
                    </button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <div className={styles.modal}>
                      <button className={styles.close} onClick={close}>
                        &times;
                      </button>
                      <div className={styles.header}> Are you sure? </div>
                      <div className={styles.content}>
                        <button onClick={() => handleClick(comment.comment_id)}>
                          Yes, delete
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              ) : null}
            </div>
            <CommentVotes comment={comment} />
          </li>
        );
      })}
    </ul>
  );
}
export default CommentCard;
