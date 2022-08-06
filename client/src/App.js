import React, { Component } from 'react';
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import List from './pages/List';
import Landing from './pages/Landing';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }
  componentDidMount() {
    this.loginStatus()
  }
  loginStatus = () => {
    axios.get('/logged-in',
      { withCredentials: true })
      .then(response => {
        console.log(response.data);
        if (response.data.logged_in) {
          this.handleLogin(response)
        } else {
          this.handleLogout()
        }
      })

      // .catch(error => console.log('api errors:', error)
  }
  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
    return (
      <div className='app'>
          <Routes>
            <Route  path='/' element={<Landing/>} />
            <Route  path='/home' element={<Home/>} />
            <Route  path='/login' element={<Login/> } />
            <Route path='/signup' element={ <Signup handleLogin={this.handleLogin}/>} />
            <Route path='/lists' element={<List/>} />
          </Routes>
      </div>
    );
  }
}
export default App;