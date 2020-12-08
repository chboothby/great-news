import { getArticleById } from "./api";
import Loading from "./Loading";
import { BiCommentDetail, BiUpvote } from "react-icons/bi";
import Voting from "./Voting";

import React from "react";
import ErrorMessage from "./ErrorMessage";

class Article extends React.Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    errMessage: "",
  };
  componentDidMount() {
    getArticleById(this.props.article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch(({ response: { status, statusText } }) => {
        this.setState({
          isLoading: false,
          hasError: true,
          errMessage: `${status}: ${statusText}`,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const newProps = prevProps.article_id !== this.props.article_id;
    if (newProps) {
      getArticleById(this.props.article_id).then((article) => {
        this.setState({ article });
      });
    }
  }

  render() {
    const { isLoading, article, hasError, errMessage } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (hasError) {
      return <ErrorMessage errMessage={errMessage} />;
    } else {
      return (
        <section className="articlePage">
          <div className="articleMain">
            <h2>{article.title}</h2>
            <h3>{article.author} </h3>
            <h4>{new Date(article.created_at).toDateString()}</h4>
            <p>{article.body}</p>
          </div>
          <div className="articleMetrics">
            <p>
              <BiUpvote />
              {article.votes}
            </p>
            <p>
              <BiCommentDetail /> {article.comment_count}
            </p>
          </div>
          <Voting />
        </section>
      );
    }
  }
}

export default Article;
