import { getArticleById } from "./api";
import Loading from "./Loading";
import { BiCommentDetail, BiUpvote } from "react-icons/bi";
import Voting from "./Voting";
import PostComment from "./PostComment";
import AllComments from "./AllComments";
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
            <span>
              <BiUpvote />
              {article.votes}
            </span>
            <span>
              {" "}
              <BiCommentDetail /> {article.comment_count}
            </span>
            <Voting id={article.article_id} incVotes={this.incVotes} />
            <PostComment />
            <AllComments id={article.article_id} />
          </div>
        </section>
      );
    }
  }
  incVotes = (num) => {
    console.log(num);
    this.setState(({ article: { votes, ...rest } }) => {
      console.log(rest);
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
