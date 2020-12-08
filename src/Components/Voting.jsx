import { GrLike, GrDislike } from "react-icons/gr";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";
import { addVote } from "./api";

function Voting({ incVotes, votes }) {
  const [superLike, setSuperLike] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handleClick = (num) => {
    if (num === 10) {
      if (!superLike && !like && !dislike) {
        incVotes(num);
        setSuperLike(true);
      } else if (superLike) {
        incVotes(-num);
        setSuperLike(false);
      }
    }
    console.log(superLike, like, dislike);
    if (num === 1) {
      if (!like && !dislike && !superLike) {
        console.log("hey");
        incVotes(num);
        setLike(true);
      } else if (like) {
        incVotes(-num);
        setLike(false);
      }
    }
    if (num === -1) {
      if (!dislike && !like && !superLike) {
        incVotes(num);
        setDislike(true);
      } else if (dislike) {
        incVotes(-num);
        setDislike(false);
      }
    }
  };

  return (
    <section className="votingBar">
      <p>{votes}</p>
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
