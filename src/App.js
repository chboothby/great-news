import "./App.css";
import React from "react";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import Article from "./Components/Article";
import UserPage from "./Components/UserPage";

import ErrorMessage from "./Components/ErrorMessage";
import { Router } from "@reach/router";

class App extends React.Component {
  state = {
    loggedInUser: {
      username: "cooljmessy",
      name: "Peter Messy",
      avatar_url:
        "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
    },
  };
  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="App">
        <Header user={loggedInUser} />
        <Nav />
        <Router primary={false}>
          <Articles path="/" user={loggedInUser} />
          <UserPage path="/user" updateUser={this.updateUser} />
          <Articles path="/articles/topics/:topic_slug" user={loggedInUser} />
          <Article path="/articles/:article_id" user={loggedInUser} />
          <ErrorMessage default errMessage="404: Page Not Found" />
        </Router>
      </div>
    );
  }

  updateUser = (loggedInUser) => {
    this.setState({ loggedInUser });
  };
}

export default App;
