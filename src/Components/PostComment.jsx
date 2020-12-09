import { useState } from "react";
import styles from "../Styles/PostComment.module.css";
import { postComment } from "./api";

function PostComment({ addComment, id, removeComment }) {
  const [comment, setComment] = useState("");
  const [hasError, setError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    addComment(comment, "cooljmessy");
    postComment(id, comment, "cooljmessy").catch(
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
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <input
          required
          className={styles.textField}
          type="text"
          placeholder="Have your say about this article..."
        ></input>
        <button type="submit">Post</button>
        {hasError ? <p>{hasError}</p> : null}
      </form>
    </div>
  );
}

export default PostComment;
