import { useEffect, useState } from "react";
import { getPreview } from "./api";
import styles from "./ArticleCard.module.css";

function ArticleCard({ article }) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    getPreview(article.article_id).then((preview) => {
      setPreview(preview);
    });
  });

  return (
    <li key={`${article.article_id}`}>
      <section className={styles.articlePreview}>
        <h2>{article.title}</h2>
        <h3>By: {article.author}</h3>
        <p>{preview}</p>
      </section>
      <section className={styles.articleMetrics}>
        <ul>
          <li>{new Date(article.created_at).toDateString()}</li>
          <li>Votes: {article.votes}</li>
          <li>Comments: {article.comment_count}</li>
        </ul>
      </section>
    </li>
  );
}

export default ArticleCard;
