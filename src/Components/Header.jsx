import { generateGreeting, todaysDate } from "./utils";

function Header({ user }) {
  return (
    <header>
      <h1>Great News</h1>
      <h2>{todaysDate()}</h2>
      <h2>
        {generateGreeting()} {user}
      </h2>
    </header>
  );
}

export default Header;
