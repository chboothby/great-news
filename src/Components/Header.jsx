import { Link } from "@reach/router";
import { generateGreeting, todaysDate } from "./utils";

function Header({ user: { name } }) {
  return (
    <header>
      <h1>Great News</h1>
      <h2>{todaysDate()}</h2>
      <h2>
        {generateGreeting()} <Link to="/user">{name.split(" ")[0]}</Link>
      </h2>
    </header>
  );
}

export default Header;
