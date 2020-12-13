import styles from "../Styles/Comments.module.css";
import { useState } from "react";
import styled from "styled-components";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { addCommentVote } from "../api";

const Button = styled.button`
  border: none;
  border-radius: 20%;
  background-color: transparent;
  font-size: 2rem;
  color: ${(props) => (props.clicked ? "#FB8122" : "#1D2228")};
  outline: none;
  &:hover {
    background-color: transparent;
    opacity: 0.7;
    color: #fb8122;
    border: none;
  }
`;

function CommentVotes({ comment }) {
  const [votes, setVotes] = useState(comment.votes);
  const [hasUpVoted, setUpVote] = useState(false);
  const [hasDownVoted, setDownVote] = useState(false);

  const updateVotes = (id, vote) => {
    if (vote > 0) {
      if (!hasDownVoted && !hasUpVoted) {
        setVotes(votes + vote);
        setUpVote(true);
        addCommentVote(id, vote).catch(() => {
          setVotes(votes);
          setUpVote(false);
        });
      } else if (hasUpVoted) {
        setVotes(votes - vote);
        setUpVote(false);
        addCommentVote(id, -vote).catch(() => {
          setVotes(votes);
          setUpVote(true);
        });
      }
    }
    if (vote < 0) {
      if (!hasDownVoted && !hasUpVoted) {
        setVotes(votes + vote);
        setDownVote(true);
        addCommentVote(id, vote).catch(() => {
          setVotes(votes);
          setDownVote(false);
        });
      } else if (hasDownVoted) {
        setVotes(votes - vote);
        setDownVote(false);
        addCommentVote(id, -vote).catch(() => {
          setVotes(votes);
          setDownVote(true);
        });
      }
    }
  };

  return (
    <div className={styles.commentVotes}>
      <Button
        aria-label="upvote-comment"
        clicked={hasUpVoted}
        onClick={() => updateVotes(comment.comment_id, 1)}
      >
        <FaChevronUp />
      </Button>
      <p>{votes}</p>
      <Button
        aria-label="downvote-comment"
        clicked={hasDownVoted}
        onClick={() => updateVotes(comment.comment_id, -1)}
      >
        <FaChevronDown />
      </Button>
    </div>
  );
}

export default CommentVotes;
