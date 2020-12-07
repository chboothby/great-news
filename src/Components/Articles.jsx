import { useState, useEffect } from "react";
import { getArticles } from "./api";

function Articles({ topic_slug }) {
  const [articles, setArticles] = useState([]);
  const topic = topic_slug;

  useEffect(() => {
    getArticles(topic).then((response) => {
      setArticles(response);
    });
  }, [topic]);

  return (
    <section className="main">
      <ul className="articlesList">
        {articles.map((article) => {
          return <li key={article.article_id}>{article.title}</li>;
        })}
      </ul>
    </section>
  );
}

export default Articles;
