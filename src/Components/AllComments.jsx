import React from "react";
import { getArticleComments } from "../api";
import CommentCard from "./CommentCard";
import PostComment from "./PostComment";
import Loading from "./Loading";
import styles from "../Styles/Comments.module.css";
import PageNav from "./PageNav";

class AllComments extends React.Component {
  state = {
    comments: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
    commentAdded: false,
    currentPage: 1,
    lastPage: false,
  };

  componentDidMount() {
    const { sort_by, order, currentPage } = this.state;
    getArticleComments(this.props.id, sort_by, order, currentPage)
      .then((comments) => {
        if (comments.length < 10) {
          this.setState({ comments, isLoading: false, lastPage: true });
        } else this.setState({ comments, isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    const newComment = prevState.commentAdded !== this.state.commentAdded;
    if (newComment) {
      getArticleComments(this.props.id, "created_at", "desc")
        .then((comments) => {
          this.setState({ comments, commentAdded: false });
        })
        .catch((err) => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleChange = async ({ target: { value } }) => {
    (await value) === "Oldest"
      ? this.setState({ sort_by: "created_at", order: "asc" })
      : value === "Popularity"
      ? this.setState({ sort_by: "votes", order: "desc" })
      : this.setState({ sort_by: "created_at", order: "desc" });

    const { sort_by, order } = this.state;
    getArticleComments(this.props.id, sort_by, order).then((comments) => {
      this.setState({ comments });
    });
  };

  render() {
    const { comments, isLoading, currentPage, lastPage } = this.state;

    return (
      <div>
        <PostComment
          addComment={this.addComment}
          removeComment={this.removeComment}
          id={this.props.id}
        />
        <div className={styles.commentsHeader}>
          <h3>All Comments</h3>

          <form onChange={this.handleChange} className={styles.commentFilter}>
            <select>
              <option>Most recent</option>
              <option>Oldest</option>
              <option>Popularity</option>
            </select>
          </form>
        </div>
        {isLoading ? (
          <Loading items={"comments"} />
        ) : (
          <CommentCard comments={comments} deleteComment={this.deleteComment} />
        )}
        <PageNav
          currentPage={currentPage}
          lastPage={lastPage}
          nextPage={this.nextPage}
        />
      </div>
    );
  }

  addComment = (body, author) => {
    const date = JSON.stringify(new Date());
    this.setState((currState) => {
      return {
        comments: [
          {
            author,
            body,
            created_at: date,
            comment_id: 100000,
            votes: 0,
          },
          ...currState.comments,
        ],
        commentAdded: true,
      };
    });
  };

  removeComment = () => {
    this.setState((currState) => {
      return {
        comments: currState.comments.slice(1),
      };
    });
  };

  deleteComment = (id) => {
    this.setState((currState) => {
      return {
        comments: currState.comments.filter(({ comment_id }) => {
          return id !== comment_id;
        }),
      };
    });
  };

  nextPage = (num) => {
    const { order, sort_by, currentPage } = this.state;
    window.scrollTo(0, 1100);
    this.setState(
      ({ currentPage }) => {
        return {
          currentPage: currentPage + num,
        };
      },
      () => {
        getArticleComments(this.props.id, sort_by, order, currentPage + num)
          .then((comments) => {
            if (comments.length < 10) {
              this.setState({ lastPage: true, comments });
            } else this.setState({ comments, lastPage: false });
          })
          .catch((err) => {
            this.setState(({ currentPage }) => {
              return {
                lastPage: true,
                currentPage: currentPage - num,
              };
            });
          });
      }
    );
  };
}

export default AllComments;
