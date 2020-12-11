import React from "react";
import { getArticleComments } from "../api";
import CommentCard from "./CommentCard";
import PostComment from "./PostComment";
import Loading from "./Loading";
import styles from "../Styles/Comments.module.css";

class AllComments extends React.Component {
  state = {
    comments: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
    commentAdded: false,
  };

  componentDidMount() {
    const { sort_by, order } = this.state;
    getArticleComments(this.props.id, sort_by, order)
      .then((comments) => {
        this.setState({ comments, isLoading: false });
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { sort_by, order } = this.state;
    getArticleComments(this.props.id, sort_by, order).then((comments) => {
      this.setState({ comments });
    });
  };

  handleChange = ({ target: { value } }) => {
    value === "Oldest"
      ? this.setState({ sort_by: "created_at", order: "asc" })
      : value === "Popularity"
      ? this.setState({ sort_by: "votes", order: "desc" })
      : this.setState({ sort_by: "created_at", order: "desc" });
  };

  render() {
    const { comments, isLoading } = this.state;

    return (
      <div>
        <PostComment
          addComment={this.addComment}
          removeComment={this.removeComment}
          id={this.props.id}
        />
        <div className={styles.commentsHeader}>
          <h3>All Comments</h3>

          <form
            onChange={this.handleChange}
            className={styles.commentFilter}
            onSubmit={this.handleSubmit}
          >
            <select>
              <option>Most recent</option>
              <option>Oldest</option>
              <option>Popularity</option>
            </select>
            <button type="submit">Sort</button>
          </form>
        </div>
        {isLoading ? (
          <Loading items={"comments"} />
        ) : (
          <CommentCard comments={comments} deleteComment={this.deleteComment} />
        )}
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
}

export default AllComments;
