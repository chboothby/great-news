import { FiHeart, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { useState } from "react";
import { addVote } from "../api";
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
  color: #1d2228;
  transition: all 0.4s ease-in-out;
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
    box-shadow: 10px 5px 15px rgba(251, 129, 34, 0.8);
  }
`;

function Voting({ incVotes, id }) {
  const [superLike, setSuperLike] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [currentVote, setVote] = useState(0);

  const handleClick = (num) => {
    if (num === 10) {
      if (superLike) {
        incVotes(-num);
        setSuperLike(false);
        setVote(0);
        addVote(id, -num).catch(() => {
          incVotes(num);
          setSuperLike(true);
          setVote(num);
        });
      } else {
        let prevVote = currentVote;
        incVotes(-prevVote);
        incVotes(num);
        setSuperLike(true);
        setDislike(false);
        setLike(false);
        setVote(num);
        Promise.all([addVote(id, num), addVote(id, -prevVote)]).catch(() => {
          incVotes(prevVote);
          incVotes(-num);
          setSuperLike(false);
          setVote(prevVote);
          if (prevVote === 0) {
            setLike(false);
            setDislike(false);
          }
          if (prevVote === 1) {
            setLike(true);
            setDislike(false);
          } else if (prevVote === -1) {
            setLike(false);
            setDislike(true);
          }
        });
      }
    }
    if (num === 1) {
      if (like) {
        incVotes(-num);
        setLike(false);
        setVote(0);
        addVote(id, -num).catch(() => {
          incVotes(num);
          setLike(true);
          setVote(num);
        });
      } else {
        let prevVote = currentVote;
        incVotes(-prevVote);
        incVotes(num);
        setLike(true);
        setDislike(false);
        setSuperLike(false);
        setVote(num);
        Promise.all([addVote(id, num), addVote(id, -prevVote)]).catch(() => {
          incVotes(prevVote);
          incVotes(-num);
          setLike(false);
          setVote(prevVote);
          if (prevVote === 10) {
            setSuperLike(true);
            setDislike(false);
          } else if (prevVote === -1) {
            setSuperLike(false);
            setDislike(true);
          } else {
            setSuperLike(false);
            setDislike(false);
          }
        });
      }
    } else if (num === -1) {
      if (dislike) {
        incVotes(-num);
        setDislike(false);
        setVote(0);
        addVote(id, -num).catch(() => {
          incVotes(num);
          setDislike(true);
          setVote(num);
        });
      } else {
        let prevVote = currentVote;
        incVotes(-prevVote);
        incVotes(num);
        setLike(false);
        setDislike(true);
        setSuperLike(false);
        setVote(num);
        Promise.all([addVote(id, num), addVote(id, -prevVote)]).catch(() => {
          incVotes(prevVote);
          incVotes(-num);
          setDislike(false);
          setVote(prevVote);
          if (prevVote === 10) {
            setSuperLike(true);
            setLike(false);
          } else if (prevVote === 1) {
            setSuperLike(false);
            setLike(true);
          } else {
            setSuperLike(false);
            setLike(false);
          }
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
        <FiThumbsUp />
      </Button>
      <Button
        clicked={dislike}
        onClick={() => {
          handleClick(-1);
        }}
      >
        <FiThumbsDown />
      </Button>
    </section>
  );
}

export default Voting;
