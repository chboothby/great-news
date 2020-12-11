import { useEffect, useState } from "react";
import { getTopics, postArticle } from "./api";
import { Link } from "@reach/router";
import styles from "../Styles/UserPage.module.css";

function PostArticle({ user }) {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [articleCreated, setArticle] = useState("");
  const [hasError, setErrMess] = useState(false);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, [topics, articleCreated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    postArticle(user, topic, title, body)
      .then((article_id) => {
        console.log(article_id);
        setArticle(article_id);
        setTopic("");
        setBody("");
        setTitle("");
        console.log(articleCreated);
      })
      .catch(({ response: { status, statusText } }) => {
        setErrMess(
          `Oops, unable to post article. ${status}: ${statusText}. Please try again`
        );
      });
  };

  const handleChange = ({ target: { id, value } }) => {
    id === "topic"
      ? setTopic(value)
      : id === "body"
      ? setBody(value)
      : setTitle(value);
  };
  if (articleCreated) {
    return (
      <div>
        <p>Successfully posted your article!</p>
        <Link to={`/articles/${articleCreated}`}>view it here</Link>
      </div>
    );
  } else if (!articleCreated) {
    return (
      <form
        className={styles.form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <label className={styles.input}>
          Article Title:
          <input required value={title} id="title" type="search"></input>
        </label>
        <label className={styles.input}>
          Topic:
          <select required id="topic">
            <option>Select topic</option>
            {topics.map(({ slug }) => {
              return <option key={slug}>{slug}</option>;
            })}
          </select>
        </label>
        <textarea
          required
          className={styles.input}
          value={body}
          id="body"
          placeholder="Write your article in here..."
        ></textarea>
        <button type="submit">Submit</button>
        {hasError ? <p>{hasError}</p> : null}
      </form>
    );
  }
}
export default PostArticle;
