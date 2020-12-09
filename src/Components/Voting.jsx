import { GrLike, GrDislike } from "react-icons/gr";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";
import { addVote } from "./api";
import styled from "styled-components";
const Button = styled.button`
  border: 1px solid black;
  border-radius: 20%;
  height: 45px;
  margin: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  background: ${(props) => (props.clicked ? "purple" : "transparent")};
  color: ${(props) => (props.clicked ? "grey" : "black")};

  &&:hover {
    opacity: 0.7;
  }
`;

function Voting({ incVotes, id }) {
  const [superLike, setSuperLike] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handleClick = (num) => {
    if (num === 10) {
      if (!superLike && !like && !dislike) {
        incVotes(num);
        setSuperLike(true);
        addVote(id, num).catch(() => {
          incVotes(-num);
          setSuperLike(false);
        });
      } else if (superLike) {
        incVotes(-num);
        setSuperLike(false);
        addVote(id, -num).catch(() => {
          incVotes(num);
          setSuperLike(true);
        });
      }
    }
    if (num === 1) {
      if (!like && !dislike && !superLike) {
        incVotes(num);
        setLike(true);
        addVote(id, num).catch(() => {
          incVotes(-num);
          setLike(false);
        });
      } else if (like) {
        incVotes(-num);
        setLike(false);
        addVote(id, -num).catch(() => {
          incVotes(num);
          setLike(true);
        });
      }
    }
    if (num === -1) {
      if (!dislike && !like && !superLike) {
        incVotes(num);
        setDislike(true);
        addVote(id, num).catch(() => {
          incVotes(-num);
          setDislike(false);
        });
      } else if (dislike) {
        incVotes(-num);
        setDislike(false);
        addVote(id, -num).catch(() => {
          incVotes(num);
          setDislike(true);
        });
      }
    }
  };

  return (
    <section className="votingBar">
      <Button
        clicked={superLike}
        onClick={() => {
          handleClick(10);
        }}
      >
        <FiHeart />
      </Button>
      <Button
        clicked={like}
        onClick={() => {
          handleClick(1);
        }}
      >
        <GrLike />
      </Button>
      <Button
        clicked={dislike}
        onClick={() => {
          handleClick(-1);
        }}
      >
        <GrDislike />
      </Button>
    </section>
  );
}

export default Voting;
