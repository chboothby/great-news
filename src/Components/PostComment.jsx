import { useState } from "react";
import styles from "../Styles/PostComment.module.css";
function PostComment({ addComment }) {
  const [comment, setComment] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    addComment(comment);
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
      </form>
    </div>
  );
}

export default PostComment;
