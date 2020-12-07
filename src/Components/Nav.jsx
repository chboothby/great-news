import { Link } from "@reach/router";
import { useEffect, useState } from "react";
import { getTopics } from "./api";

function Nav() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response);
    });
  }, [topics]);

  return (
    <nav>
      <Link to="/articles">all</Link>
      {topics.map((topic) => {
        return (
          <Link to={`/articles/${topic.slug}`} key={`${topic.slug}`}>
            {topic.slug}
          </Link>
        );
      })}
    </nav>
  );
}

export default Nav;
