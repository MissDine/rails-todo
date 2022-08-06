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
    <div>
      <div className="lin"> 
      <div className="links">
      <div className="hee">
      <h1 className="he">Tu Jipange</h1>
      </div> 
      <Link className="link" to='/login'>Log In</Link>
      <Link className="link" to='/signup'>Sign Up</Link>
      <Link className='link' to="/home">Home</Link>
      <Link className='link' to="/list">List</Link>
      </div>
        {/* <button variant="outline" onClick={handleLogoutClick}>
          Logout
        </button> */}
    </div>
    </div>
  );
}


export default NavBar;