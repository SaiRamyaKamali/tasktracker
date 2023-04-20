import { Component } from 'react';
import Tasks from '../Tasks';
import axios from 'axios';

import './index1.css';

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
    if(!usernameInput){
      alert('please enter the user name')
    }
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
          <div className='header'>
          <h1>Welcome to Task Tracker App</h1>
          <p>Organize your
            work and life. Become focused with the TaskTracker.</p>
          </div>
          <div className='wrapper-container'>
          <div className="wrapper">
            <div className="title">Login Form</div>
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <input type="text"
                  value={this.state.username}
                  onChange={this.handleUsernameInputChange} />
                <label>Username</label>
              </div>
              <div className="field">
                <button type="submit" className="submit-button">Submit</button>
              </div>
            </form>
          </div>
          </div>
        </div>
      );
    }
  }
}


export default UserDetails
