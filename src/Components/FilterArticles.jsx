import styles from "../Styles/Comments.module.css";
import { useState } from "react";

function FilterArticles({ filterArticles }) {
  const [filterBy, setFilter] = useState("");

  const handleChange = ({ target: { value } }) => {
    setFilter(value);
    filterArticles(filterBy);
  };

  return (
    <form onChange={handleChange} className={styles.commentFilter}>
      <select>
        <option>Most recent</option>
        <option>Oldest</option>
        <option>Most popular</option>
      </select>
    </form>
  );
}
export default FilterArticles;
