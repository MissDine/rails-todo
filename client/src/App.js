import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import List from './pages/List';
import Landing from './pages/Landing';
import NavBar from './components/NavBar';

function App () {
  const [user, setUser] = React.useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/me').then(r => {
      if(r.ok) {
        r.json().then(user => setUser(user))
        navigate('/home')
      }
    })
  }, [navigate])
  if(!user) return <Login onLogin={setUser} />
    return (
      <div className='app'>
        <NavBar user={user} setUser={setUser}/>
          <Routes>
            <Route  path='/' element={<Landing/>} />
            <Route  path='/home' element={<Home user={user}/>} />
            <Route  path='/login' element={<Login/> } />
            <Route path='/signup' element={ <Signup/>} />
            <Route path='/lists' element={<List user={user}/>} />
          </Routes>
      </div>
    );
}
export default App;