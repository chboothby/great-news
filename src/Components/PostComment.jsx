import styles from "../Styles/PostComment.module.css";
function PostComment() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles.postComment}>
      <h3>Add Comment</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.textField} type="text"></input>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default PostComment;
