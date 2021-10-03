import React, { Component } from 'react';

class Register extends Component {
  state = { user_name: '', password: '' };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_name: this.state.user_name,
        password: this.state.password
      })
    });
  };

  render() {
    return (
      <form  classname="mt-5" onSubmit={this.onSubmit} noValidate>
        <h1 className="text-left mt-5">Login</h1>        
          <div class="modal-body">
          <input
            type="text"
            name="user_name"
            placeholder="Enter user name"
            value={this.state.user_name}
            onChange={this.handleInputChange} />
            </div>
          <div class="modal-body">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          </div>
          
          <input class="modal-body" type="submit" value="Login"/>
          
      </form>
    );
  }
}

export default Register;