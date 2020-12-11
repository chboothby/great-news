import "./App.css";
import React from "react";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import Article from "./Components/Article";
import UserPage from "./Components/UserPage";
import ErrorMessage from "./Components/ErrorMessage";
import { Router } from "@reach/router";

export const UserContext = React.createContext();

class App extends React.Component {
  state = {
    loggedInUser: {
      isLoggedIn: true,
      username: "cooljmessy",
      name: "Peter Messy",
      avatar_url:
        "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
    },
  };
  render() {
    const { loggedInUser } = this.state;
    return (
      <UserContext.Provider value={loggedInUser}>
        <div className="App">
          <Header />
          <Nav />
          <Router primary={false}>
            <Articles path="/" />
            <UserPage
              path="/user"
              updateUser={this.updateUser}
              user={loggedInUser}
            />
            <Articles path="/articles/topics/:topic_slug" />
            <Article path="/articles/:article_id" user={loggedInUser} />
            <ErrorMessage default errMessage="404: Page Not Found" />
          </Router>
          <button
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Back to top
          </button>
        </div>
      </UserContext.Provider>
    );
  }

  updateUser = (loggedInUser) => {
    this.setState({ loggedInUser });
  };
}

export default App;
