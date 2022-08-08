import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <div className="pt-10">
      <div className="links flex justify-around">
        <div className="">
          <h1 className="text-black">Tu Jipange</h1>
        </div> 
        {!user ? (<div className="flex ">
          <Link className="mr-5 text-lg" to='/login'>Log In</Link>
          <Link className="mr-5 text-lg" to='/signup'>Sign Up</Link>
        </div>) :
        (<div>
          <Link className='mr-5 text-lg' to="/home">Home</Link>
          <Link className='mr-5 text-lg' to="/lists">List</Link>
          <button variant="outline" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>)}
      </div>
    </div>
  );
}


export default NavBar;