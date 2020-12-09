import styles from "../Styles/Comments.module.css";
import { useState } from "react";
import styled from "styled-components";
import { VscChevronUp, VscChevronDown } from "react-icons/vsc";

const Button = styled.button`
  border: none;
  border-radius: 20%;
  background-color: transparent;
  font-size: 2rem;
  color: ${(props) => (props.clicked ? "purple" : "black")};
  outline: none;
  &:hover {
    opacity: 0.7;
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
      } else if (hasUpVoted) {
        setVotes(votes - vote);
        setUpVote(false);
      }
    }
    if (vote < 0) {
      if (!hasDownVoted && !hasUpVoted) {
        setVotes(votes + vote);
        setDownVote(true);
      } else if (hasDownVoted) {
        setVotes(votes - vote);
        setDownVote(false);
      }
    }
  };
  return (
    <div className={styles.commentVotes}>
      <Button
        clicked={hasUpVoted}
        onClick={() => updateVotes(comment.comment_id, 1)}
      >
        <VscChevronUp />
      </Button>
      <p>{votes}</p>
      <Button
        clicked={hasDownVoted}
        onClick={() => updateVotes(comment.comment_id, -1)}
      >
        <VscChevronDown />
      </Button>
    </div>
  );
}

export default CommentVotes;
