import { Component } from 'react';
import Tasks from '../Tasks';
import axios from 'axios';



class UserDetails extends Component {
  state = {
    usernameInput: '',
    isUser: null,
    userDetailsList: null,
  };

  handleUsernameInputChange = (event) => {
    this.setState({ usernameInput: event.target.value });
  };

  handleUserDetailsListChange = (updatedUserDetailsList) => {
    this.setState({ userDetailsList: updatedUserDetailsList });
  };

  onGoBack = () => {
    this.setState({ usernameInput: '', isUser: null });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { usernameInput } = this.state;
    const username = usernameInput.trim();
    try {
      const response = await axios.get(`http://localhost:5000/${username}/tasks`);
      const userDetailsList = response.data;
      this.setState({ isUser: true, userDetailsList });
    } catch (error) {
      this.setState({ isUser: false });
    }
  };

  render() {
    const { usernameInput, isUser, userDetailsList } = this.state;
    const username = usernameInput.trim();



    // If a user is selected, render the tasks component
    if (isUser === true) {
      return (
        <div>
          <Tasks
            userDetailsList={userDetailsList}
            onUserDetailsListChange={this.handleUserDetailsListChange}
            username={username}
          />
        </div>
      );
    }
    // Otherwise, render the form
    else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Enter Username:
              <input
                type="text"
                value={this.state.username}
                onChange={this.handleUsernameInputChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  }
}


export default UserDetails
