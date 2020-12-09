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
      <Link className={styles.all} to="/">
        all
      </Link>
      <section className={styles.topics}>
        {topics.map((topic) => {
          return (
            <Link
              className={styles.topic}
              to={`/articles/topics/${topic.slug}`}
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
