import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


class Signup extends Component {
  constructor(props) {
    // console.log(props);
    super(props);
    this.state = { 
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
     };
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
handleSubmit = (event) => {
    event.preventDefault()
    // console.log("Collo");
    const {name, email, password, password_confirmation} = this.state
    let user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
    console.log(user);
axios.post('/users', user, {withCredentials: true})
    .then(response => {
      // console.log(response);
      if (response.data.status === 'created') {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    // .catch(error => console.log('api errors:', error))
  };
  redirect = () => {
    this.props.history.push('/')
  }
handleErrors = () => {
   return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>}
        )}
        </ul> 
      </div>
    )
  };

render() {
    const {name, email, password, password_confirmation} = this.state
return (
      <div className='w-50 mx-auto'>
        <h1 className='hed'>Sign Up</h1>        
<form onSubmit={this.handleSubmit}>
          <input required
            placeholder="username"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <input required
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input required
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />          
          <input required
            placeholder="password confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />
        
          <button placeholder="submit" type="submit">
          <Link to="/"><h2 className="text-white text-decoration-none">Sign Up</h2></Link>
          </button>
      
        </form>
      </div>
    );
  }
}
export default Signup;