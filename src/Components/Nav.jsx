import { Link } from "@reach/router";
import { useEffect, useState } from "react";
import { getTopics } from "../api";
import styles from "../Styles/Nav.module.css";
import { FiHome, FiMenu } from "react-icons/fi";
import { ImCross } from "react-icons/im";

function Nav() {
  const [topics, setTopics] = useState([]);
  const [isToggled, setToggle] = useState(false);
  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response);
    });
  }, []);

  const toggleNav = () => {
    isToggled ? setToggle(false) : setToggle(true);
  };
  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.recent}>
        <FiHome />
      </Link>
      <section className={styles.menu}>
        <button onClick={toggleNav} className={styles.toggle}>
          {isToggled ? <ImCross /> : <FiMenu />}
        </button>
        <div className={isToggled ? styles.isToggled : styles.topics}>
          {topics.map((topic) => {
            return (
              <Link
                onClick={toggleNav}
                to={`/articles/topics/${topic.slug}`}
                className={styles.topic}
                key={`${topic.slug}`}
              >
                {topic.slug}
              </Link>
            );
          })}
        </div>
      </section>
    </nav>
  );
}

export default Nav;
