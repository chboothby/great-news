import { GrLike, GrDislike } from "react-icons/gr";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";
import { addVote } from "./api";

function Voting({ incVotes, id }) {
  const [superLike, setSuperLike] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handleClick = (num) => {
    if (num === 10) {
      if (!superLike && !like && !dislike) {
        incVotes(num);
        setSuperLike(true);
        addVote(id, num);
      } else if (superLike) {
        incVotes(-num);
        setSuperLike(false);
        addVote(id, -num);
      }
    }
    if (num === 1) {
      if (!like && !dislike && !superLike) {
        incVotes(num);
        setLike(true);
        addVote(id, num);
      } else if (like) {
        incVotes(-num);
        setLike(false);
        addVote(id, -num);
      }
    }
    if (num === -1) {
      if (!dislike && !like && !superLike) {
        incVotes(num);
        setDislike(true);
        addVote(id, num);
      } else if (dislike) {
        incVotes(-num);
        setDislike(false);
        addVote(id, -num);
      }
    }
  };

  return (
    <section className="votingBar">
      <button
        onClick={() => {
          handleClick(10);
        }}
      >
        <FiHeart />
      </button>
      <button
        onClick={() => {
          handleClick(1);
        }}
      >
        <GrLike />
      </button>
      <button
        onClick={() => {
          handleClick(-1);
        }}
      >
        <GrDislike />
      </button>
    </section>
  );
}

export default Voting;
