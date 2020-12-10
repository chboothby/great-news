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

  const NavLink = (props) => (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          style: {
            color: isCurrent ? "#fb8122" : "#e1e2e2",
          },
        };
      }}
    />
  );

  return (
    <nav className={styles.navBar}>
      <NavLink className={styles.recent} to="/">
        recent
      </NavLink>
      <section className={styles.topics}>
        {topics.map((topic) => {
          return (
            <NavLink
              className={styles.topic}
              to={`/articles/topics/${topic.slug}`}
              key={`${topic.slug}`}
            >
              {topic.slug}
            </NavLink>
          );
        })}
      </section>
    </nav>
  );
}

export default Nav;
