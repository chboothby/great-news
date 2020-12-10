import React from "react";
import { getUsers, getUser } from "./api";
import Loading from "./Loading";
class UserPage extends React.Component {
  state = {
    selectedUser: "",
    users: [],
    user: {
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
      this.setState({ users, isLoading: false });
      console.log(this.state.users);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    getUser(this.state.selectedUser).then((user) => {
      this.setState({ user, isLoggedIn: true });
      this.props.updateUser(user);
    });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ selectedUser: value });
    console.log(value);
  };

  logout = () => {
    this.setState({ isLoggedIn: false, user: {} });
  };

  render() {
    const { user, users, isLoading, isLoggedIn } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (isLoggedIn) {
      return (
        <section className="userPage">
          <div className="userCard">
            <img src={user.avatar_url} alt={`${user.name}'s avatar`}></img>
            <h3>{user.name}</h3>
            <h4>Username: {user.username}</h4>
            <button onClick={this.logout}>Logout</button>
          </div>
        </section>
      );
    } else {
      return (
        <div className="loginPage">
          <h3>Please login to view your profile</h3>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <select>
              Select user:
              {users.map((user) => {
                return <option key={user.username}>{user.username}</option>;
              })}
            </select>
            <button type="submit">Login</button>
          </form>
        </div>
      );
    }
  }
}

export default UserPage;
