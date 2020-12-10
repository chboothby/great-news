import styles from "../Styles/Comments.module.css";
import { useState } from "react";

function FilterArticles({ filterArticles }) {
  const [filterBy, setFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    filterArticles(filterBy);
  };

  const handleChange = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <form
      onChange={handleChange}
      className={styles.commentFilter}
      onSubmit={handleSubmit}
    >
      <select>
        <option>Most recent</option>
        <option>Oldest</option>
        <option>Most popular</option>
      </select>
      <button type="submit">Sort</button>
    </form>
  );
}
export default FilterArticles;
