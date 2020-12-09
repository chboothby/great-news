import { GrLike, GrDislike } from "react-icons/gr";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";
import { addVote } from "./api";
import styled from "styled-components";
import styles from "../Styles/Article.module.css";

const Button = styled.button`
  border-radius: 20%;
  min-height: 30px;
  margin: 0.5rem;
  padding: 0.3rem;
  font-size: 1.2rem;
  outline: none;
  background: ${(props) => (props.clicked ? "#fb8122" : "transparent")};
  color: ${(props) => (props.clicked ? "#1D2228" : "#1D2228")};

  &:hover {
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
    <section className={styles.voting}>
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
