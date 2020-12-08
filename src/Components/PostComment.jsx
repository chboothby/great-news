function PostComment() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="post-comment">
      <form onSubmit={handleSubmit}>
        <input type="text"></input>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default PostComment;
