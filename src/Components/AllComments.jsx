import React from "react";
import { getArticleComments } from "./api";
import CommentCard from "./CommentCard";
import Loading from "./Loading";

class AllComments extends React.Component {
  state = {
    comments: [],
    isLoading: true,
  };

  componentDidMount() {
    getArticleComments(this.props.id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { comments, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="all-comments">
        <h3>All comments</h3>
        <form className="comment-filter" onSubmit={this.handleSubmit}>
          <select>
            <option>All</option>
            <option>Most recent</option>
            <option>Oldest</option>
            <option>Popularity</option>
          </select>
          <button type="submit">Sort</button>
        </form>
        <CommentCard comments={comments} />
      </div>
    );
  }
}

export default AllComments;
