import { Link } from "@reach/router";
import { generateGreeting, todaysDate } from "./utils";
import { UserContext } from "../App";
import { useContext } from "react";

function Header() {
  const { name } = useContext(UserContext);

  return (
    <header>
      <h1>Great News</h1>
      <h2>{todaysDate()}</h2>
      <h2>
        {generateGreeting()}
        <span className="wrap">
          <Link className="user" to="/user">
            {name.split(" ")[0]}
          </Link>
        </span>
      </h2>
    </header>
  );
}

export default Header;
