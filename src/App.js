import "./App.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import Article from "./Components/Article";

import { Router } from "@reach/router";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />

      <Router>
        <Articles path="/" />

        <Articles path="/articles/topics/:topic_slug" />
        <Article path="/articles/:article_id" />
      </Router>
    </div>
  );
}

export default App;
