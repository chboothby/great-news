import React from "react";
import { getArticleComments } from "./api";
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
  };

  componentDidMount() {
    const { sort_by, order } = this.state;
    getArticleComments(this.props.id, sort_by, order).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
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
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div>
        <PostComment
          addComment={this.addComment}
          removeComment={this.removeComment}
          id={this.props.id}
          user={this.props.user}
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
        <CommentCard comments={comments} user={this.props.user} />
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
}

export default AllComments;
