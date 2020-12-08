import React from "react";
import CommentCard from "./CommentCard";
class AllComments extends React.Component {
  state = {
    comments: [
      {
        comment_id: 154,
        author: "cooljmessy",
        votes: 4,
        created_at: "2016-02-29T17:25:02.517Z",
        body:
          "Dolores qui illo et minima et facilis sunt. Enim velit sunt ut quae est ut.",
      },
      {
        comment_id: 253,
        author: "tickle122",
        votes: 3,
        created_at: "2016-10-10T10:31:10.823Z",
        body:
          "Expedita non veritatis dicta blanditiis ratione qui et. Corrupti sapiente accusantium molestiae vel nemo quia ullam. Ut distinctio aut autem fuga ullam et quod vero architecto. Sapiente voluptatem neque.",
      },
      {
        comment_id: 254,
        author: "weegembump",
        votes: 16,
        created_at: "2017-04-20T19:55:25.295Z",
        body:
          "Cupiditate commodi delectus molestiae exercitationem iure eum error et. Et pariatur dolores assumenda explicabo ut ut rem. Magni molestiae veritatis illum.",
      },
      {
        comment_id: 196,
        author: "cooljmessy",
        votes: 0,
        created_at: "2017-07-15T21:11:34.498Z",
        body:
          "Qui consequuntur id beatae ut vel a error. Vitae et et. Mollitia soluta neque quibusdam tempore quis quia eos autem magni. Voluptatibus numquam nostrum et enim officiis rerum. Optio quo harum dolore voluptatem sit temporibus rem voluptas rem.",
      },
      {
        comment_id: 272,
        author: "tickle122",
        votes: 17,
        created_at: "2017-09-26T21:34:42.072Z",
        body:
          "Distinctio excepturi laboriosam eos aperiam quis amet eum animi minima. Officiis in quia. Est consequatur optio atque nostrum iusto impedit harum quod asperiores.",
      },
      {
        comment_id: 115,
        author: "happyamy2016",
        votes: 12,
        created_at: "2018-01-19T14:47:14.514Z",
        body:
          "Neque dolor sint illum id consequuntur debitis qui nam eum. Nam adipisci similique consequatur officiis. Totam qui enim at iste dolorem ullam. Tenetur laudantium sed facilis aspernatur occaecati. Provident rerum quia consectetur et. Molestiae eligendi commodi.",
      },
    ],
  };
  handleSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    const { comments } = this.state;
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
