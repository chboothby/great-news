import { getArticleById } from "./api";
import Loading from "./Loading";
import Voting from "./Voting";

const { useState, useEffect } = require("react");

function Article({ article_id }) {
  const [article, setArticle] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setLoading(false);
    });
  }, [article_id]);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <section className="articlePage">
        <div className="articleMain">
          {" "}
          <h2>{article.title}</h2>
          <h3>{article.author} </h3>
          <h4>{new Date(article.created_at).toDateString()}</h4>
          <p>{article.body}</p>
        </div>
        <div classNae="articleMetrics">
          <p>comments: {article.comment_count}</p>
          <p>votes: {article.votes}</p>
        </div>
        <Voting />
      </section>
    );
  }
}

export default Article;
