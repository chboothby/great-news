import { useEffect, useState } from "react";
import { getPreview } from "../api";
import styles from "../Styles/ArticleCard.module.css";
import { Link } from "@reach/router";
import { BiCommentDetail, BiUpvote } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";

function ArticleCard({ article }) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    getPreview(article.article_id).then((preview) => {
      setPreview(preview);
    });
  }, [article.article_id]);

  return (
    <li className={styles.articleCard} key={`${article.article_id}`}>
      <section className={styles.articlePreview}>
        <h2>{article.title}</h2>
        <h3>
          By: {article.author}{" "}
          <span>
            <FaRegNewspaper /> {new Date(article.created_at).toDateString()}
          </span>
        </h3>
        <p>
          {preview}
          <span>
            <Link
              className={styles.link}
              to={`/articles/${article.article_id}`}
            >
              read more
            </Link>
          </span>
        </p>
      </section>
      <section className={styles.articleMetrics}>
        <Link className={styles.link} to={`/articles/${article.article_id}`}>
          <ul>
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
        </Link>
      </section>
    </li>
  );
}

export default ArticleCard;
