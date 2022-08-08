import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Signup from './Signup'

function Login({onLogin}) {

  const [showLogin, setShowLogin] = React.useState(true)
  const [name, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        name: name, 
        password: password 
      })
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        navigate('/')
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="w-50 mx-auto">
      <h1 className="text-black text-center py-10">{showLogin ? "Log In" : "Sign Up"}</h1>
      {showLogin ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              required
              placeholder="username"
              type="text"
              className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="name"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              required
              placeholder="password"
              type="password"
              name="password"
              className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          
            <button className='bg-orange-600 py-2 px-3 rounded mb-6 hover:bg-orange-800' placeholder="submit" type="submit">
              {isLoading ? "Logging in..." : "Login"}
            </button>

          {errors.map((err) => (
            <p key={err} className='text-red-600 py-2'>{err}</p>
          ))}
        </form>
        <div className="pb-6">
        or <Link to="/signup" className="text-orange-600" onClick={() => setShowLogin(false)}>sign up</Link>
      </div>
    </div>
      ) : ( <>
      <Signup onLogin={onLogin}/>
      <h2 className="pb-10 mt-4">
        Already have an account? <Link to="/login" className='text-orange-600 hover:text-orange-800'  onClick={() => setShowLogin(true)}>Login</Link>
      </h2>
      </>
      )}
    </div>
  )
}

export default Login