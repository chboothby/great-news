import { useEffect, useState } from "react";
import { getPreview } from "./api";
import styles from "../Styles/ArticleCard.module.css";
import { Link } from "@reach/router";
import { BiCommentDetail, BiUpvote } from "react-icons/bi";

function ArticleCard({ article }) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    getPreview(article.article_id).then((preview) => {
      setPreview(preview);
    });
  });

  return (
    <li className={styles.articleCard} key={`${article.article_id}`}>
      <section className={styles.articlePreview}>
        <h2>{article.title}</h2>
        <h3>By: {article.author}</h3>
        <p>
          {preview}
          <span>
            <Link to={`/articles/${article.article_id}`}>see more</Link>
          </span>
        </p>
      </section>
      <section className={styles.articleMetrics}>
        <ul>
          <li>Posted: {new Date(article.created_at).toDateString()}</li>
          <li>
            <p>
              <BiUpvote />
              {article.votes}
            </p>
          </li>
          <li>
            <p>
              <BiCommentDetail /> {article.comment_count}
            </p>
          </li>
        </ul>
      </section>
    </li>
  );
}

export default ArticleCard;
