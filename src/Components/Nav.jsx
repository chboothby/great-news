import { Link } from "@reach/router";
import { useEffect, useState } from "react";
import { getTopics } from "./api";
import styles from "../Styles/Nav.module.css";

function Nav() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response);
    });
  }, [topics]);

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.recent}>
        all
      </Link>
      <section className={styles.topics}>
        {topics.map((topic) => {
          return (
            <Link
              to={`/articles/topics/${topic.slug}`}
              className={styles.topic}
              key={`${topic.slug}`}
            >
              {topic.slug}
            </Link>
          );
        })}
      </section>
    </nav>
  );
}

export default Nav;
