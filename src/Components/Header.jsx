import moment from "moment";

function Header() {
  return (
    <header>
      <h1>Great News</h1>
      <h2>{moment().format("dddd Do MMMM YYYY")}</h2>
    </header>
  );
}

export default Header;
