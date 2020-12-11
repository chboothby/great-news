import { deleteArticle, getArticleById } from "../api";
import Loading from "./Loading";
import { BiCommentDetail, BiUpvote } from "react-icons/bi";
import Voting from "./Voting";
import AllComments from "./AllComments";
import React from "react";
import ErrorMessage from "./ErrorMessage";
import styles from "../Styles/Article.module.css";
import Popup from "reactjs-popup";
import { Link } from "@reach/router";

class Article extends React.Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    errMessage: "",
    isDeleted: false,
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
      getArticleById(this.props.article_id)
        .then((article) => {
          this.setState({ article });
        })
        .catch(({ response: { status, statusText } }) => {
          this.setState({
            isLoading: false,
            hasError: true,
            errMessage: `${status}: ${statusText}`,
          });
        });
    }
  }

  render() {
    const { isLoading, article, hasError, errMessage, isDeleted } = this.state;
    if (isDeleted) {
      return (
        <h3>
          Successfully deleted your article. Return to{" "}
          <Link className="link" to="/">
            homepage
          </Link>
        </h3>
      );
    }
    if (isLoading) {
      return <Loading items={"article"} />;
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
              <p>{article.body}</p>{" "}
              {this.props.user.username === article.author ? (
                <Popup
                  trigger={<button> Delete your article </button>}
                  modal
                  nested
                >
                  {(close) => (
                    <div className={styles.modal}>
                      <button className={styles.close} onClick={close}>
                        &times;
                      </button>
                      <div className={styles.header}> Are you sure? </div>
                      <div className={styles.content}>
                        <button onClick={this.removeArticle}>
                          Yes, delete
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              ) : null}
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

  removeArticle = () => {
    deleteArticle(this.state.article.article_id)
      .then(() => {
        this.setState({ isDeleted: true });
      })
      .catch(({ response: { status, statusText } }) => {
        this.setState({
          isLoading: false,
          hasError: true,
          errMessage: `${status}: ${statusText}`,
        });
      });
  };
}

export default Article;
