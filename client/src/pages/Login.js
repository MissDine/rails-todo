import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: "",
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password} = this.state
    let user = {
      username: username,
      email: email,
      password: password
    }
    
axios.post('/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
redirect = () => {
    this.props.history.push('/')
  }
handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  };

  render() {
    const { username, email, password } = this.state
    return (
      <div className="w-50 mx-auto">
        <h1 className="hed">Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            <Link to="/home"><h2 className="text-white text-decoration-none">Login</h2></Link>
          </button>
          <div>
            or <Link to="/signup">sign up</Link>
          </div>
        </form>
      </div>
    );
  }
}
export default Login;