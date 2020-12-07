import { getArticleById } from "./api";

const { useState, useEffect } = require("react");

function Article({ article_id }) {
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
    });
  });

  return <h2>{article.title}</h2>;
}

export default Article;
