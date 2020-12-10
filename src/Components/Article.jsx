import { getArticleById } from "./api";
import Loading from "./Loading";
import { BiCommentDetail, BiUpvote } from "react-icons/bi";
import Voting from "./Voting";
import AllComments from "./AllComments";
import React from "react";
import ErrorMessage from "./ErrorMessage";
import styles from "../Styles/Article.module.css";

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
        <section className={styles.articlePage}>
          <div className={styles.articleMain}>
            {" "}
            <div className={styles.articleBody}>
              <h2>{article.title}</h2>
              <h3>By: {article.author} </h3>
              <h4>Posted: {new Date(article.created_at).toDateString()}</h4>
              <p>{article.body}</p>
            </div>
            <div className={styles.articleMetrics}>
              <span className={styles.comments}>
                <BiUpvote />
                {article.votes} <BiCommentDetail /> {article.comment_count}
              </span>
              <Voting
                className={styles.voting}
                id={article.article_id}
                incVotes={this.incVotes}
              />
            </div>
          </div>

          <div className={styles.commentsSection}>
            <AllComments id={article.article_id} />
          </div>
        </section>
      );
    }
  }
  incVotes = (num) => {
    this.setState(({ article: { votes, ...rest } }) => {
      return {
        article: {
          votes: votes + num,
          ...rest,
        },
      };
    });
  };
}

export default Article;
