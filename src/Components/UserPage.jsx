import React from "react";
import { getUsers, getUser } from "../api";
import Loading from "./Loading";
import styles from "../Styles/UserPage.module.css";
import PostArticle from "./PostArticle";
import Popup from "reactjs-popup";

class UserPage extends React.Component {
  state = {
    selectedUser: "tickle122",
    users: [],
    user: {
      isLoggedIn: true,
      username: "cooljmessy",
      name: "Peter Messy",
      avatar_url:
        "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
    },
    isLoading: true,
    isLoggedIn: true,
  };

  componentDidMount() {
    getUsers().then((users) => {
      this.setState({ users, isLoading: false, user: this.props.user });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    getUser(this.state.selectedUser).then((user) => {
      user.isLoggedIn = true;
      this.setState({ user, isLoggedIn: true });
      this.props.updateUser({ ...user });
    });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ selectedUser: value });
  };

  logout = () => {
    this.setState({ user: { isLoggedIn: false }, isLoggedIn: false });
    this.props.updateUser({ ...this.state.user, isLoggedIn: false });
  };

  render() {
    const { user, users, isLoading, isLoggedIn } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (isLoggedIn) {
      return (
        <section className={styles.userPage}>
          <div className={styles.userCard}>
            <div className={styles.userInfo}>
              <h3>{user.name}</h3>
              <img src={user.avatar_url} alt={`${user.name}'s avatar`}></img>
              <h4>Username: {user.username}</h4>
              <Popup
                trigger={<button className="button"> Post new article </button>}
                modal
                nested
              >
                {(close) => (
                  <div className={styles.modal}>
                    <button className={styles.close} onClick={close}>
                      &times;
                    </button>
                    <div className={styles.header}> Post new article </div>
                    <div className={styles.content}>
                      <PostArticle user={user.username} />
                    </div>
                  </div>
                )}
              </Popup>

              <button onClick={this.logout}>Logout</button>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <div className={styles.userPage}>
          <div className={styles.userCard}>
            <form
              className={styles.userInfo}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            >
              <h3>Please login to view your profile</h3>

              <select className={styles.select}>
                {users.map((user) => {
                  return <option key={user.username}>{user.username}</option>;
                })}
              </select>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default UserPage;
