import { useContext, useState } from "react";
import { UserContext } from "../App";
import styles from "../Styles/PostComment.module.css";
import { postComment } from "../api";

function PostComment({ addComment, id, removeComment }) {
  const [comment, setComment] = useState("");
  const [hasError, setError] = useState(false);
  const { username } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setComment("");
    addComment(comment, username);
    postComment(id, comment, username).catch(
      ({ response: { status, statusText } }) => {
        setError(`Oops.. ${status}: ${statusText}`);
        removeComment();
      }
    );
  };

  const handleChange = ({ target: { value } }) => {
    setComment(value);
  };

  return (
    <div className={styles.postComment}>
      <h3>Add Comment</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          onChange={handleChange}
          required
          value={comment}
          className={styles.textField}
          type="text"
          placeholder="Have your say about this article..."
        ></textarea>
        <button type="submit">Post</button>
        {hasError ? <p>{hasError}</p> : null}
      </form>
    </div>
  );
}

export default PostComment;
