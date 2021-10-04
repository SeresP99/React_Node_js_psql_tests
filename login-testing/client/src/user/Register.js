import React, { Component } from 'react';




class Register extends Component {
  state = { user_name: '', email: '', password: '' };

    handleInputChange = event => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    };

  

  onSubmit = event => {
    event.preventDefault();
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_name: this.state.user_name,
        email: this.state.email,
        password: this.state.password
      })
    });
  };

  render() {
    return (
      <form className="mt-5" onSubmit={this.onSubmit}>
        <h1>Registration</h1>
        <div>
          <input type="text" name="user_name" 
          placeholder="User name" value={user_name} onChange={this.handleInputChange}></input>
          <input type="email" name="email" 
          placeholder="Email" value={email} onChange={this.handleInputChange}></input>
          <input tpye="password" name="password" 
          placeholder="Password" value={password} onChange={this.handleInputChange}></input>
          <btn className="btn btn-primary" type="submit">Regist</btn>
        </div>
      </form>
    );
  }
}

//<form  classname="mt-5" onSubmit={this.onSubmit} noValidate>
//        <h1 className="text-left mt-5">Register</h1>        
//          <div class="modal-body">
//          <input
//            type="text"
//            name="user_name"
//            placeholder="Enter user name"
//            value={this.state.user_name}
//            onChange={this.handleInputChange}
//          />
//          </div>
//          <div class="modal-body">
//          <input
//            type="email"
//            name="email"
//            placeholder="Enter email"
//            value={this.state.email}
//            onChange={this.handleInputChange}
//          />
//          </div>
//          <div class="modal-body">
//          <input
//            type="password"
//            name="password"
//            placeholder="Enter password"
//            value={this.state.password}
//            onChange={this.handleInputChange}
//          />
//          </div>
//          
//          <input class="modal-body" type="submit" value="Register"/>
//          
//      </form>

export default Register;