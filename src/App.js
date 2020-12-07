import "./App.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import { Router } from "@reach/router";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Router>
        <Articles path="/articles" />
        <Articles path="/articles/:topic_slug" />
      </Router>
    </div>
  );
}

export default App;
