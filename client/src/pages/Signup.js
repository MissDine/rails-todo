import React from 'react';
import { useNavigate } from "react-router-dom";


function Signup({onLogin}) {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        password_confirmation: passwordConfirmation,
        email : email
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        navigate('/')
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    // .catch(error => console.log('api errors:', error))
  };
 
  return (
      <div className='w-50 mx-auto'>       
        <form onSubmit={handleSubmit}>
          <input required
            placeholder="username"
            type="text"
            name="name"
            className='mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input required
            placeholder="email"
            type="text"
            name="email"
            className='mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input required
            placeholder="password"
            type="password"
            name="password"
            className='mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />          
          <input required
            placeholder="password confirmation"
            type="password"
            name="password_confirmation"
            className='mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            value={passwordConfirmation}
            onChange={(e)=> setPasswordConfirmation(e.target.value)}
          />
        
          <button className='bg-orange-600 py-2 px-3 rounded mb-6 hover:bg-orange-800' placeholder="submit" type="submit">
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>

          {errors.map((err) => (
            <p className='text-red-500 py-1' key={err}>{err}</p>
          ))}
        </form>
      </div>
    );
  }
export default Signup;