import styles from "../Styles/Comments.module.css";
import { useState } from "react";

function FilterArticles({ filterArticles }) {
  const handleChange = ({ target: { value } }) => {
    let sort_by = "created_at";
    let order = "desc";
    if (value === "Oldest") {
      sort_by = "created_at";
      order = "asc";
    } else if (value === "Most popular") {
      sort_by = "votes";
      order = "desc";
    }

    filterArticles(sort_by, order);
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
