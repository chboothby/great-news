import "./App.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import Article from "./Components/Article";
import ErrorMessage from "./Components/ErrorMessage";
import { Router } from "@reach/router";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />

      <Router primary={false}>
        <Articles path="/" />
        <Articles path="/articles/topics/:topic_slug" />
        <Article path="/articles/:article_id" />
        <ErrorMessage default errMessage="404: Page Not Found" />
      </Router>
    </div>
  );
}

export default App;
