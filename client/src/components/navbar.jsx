import React from 'react'
import { Link, NavLink } from "react-router-dom";

const NavBar = ({user}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
          SFGE
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/">
            About
          </NavLink>

          {!user && (
            <>
            <NavLink className="nav-item nav-link" to="/Login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink>
          </>
          )}
          {user && (
            <>
            <NavLink className="nav-item nav-link" to="/me">
            {user.name}
          </NavLink>
          <NavLink className="nav-item nav-link" to="/logout">
            Logout
          </NavLink>
          <NavLink className="nav-item nav-link" to="/goodStudents">
            Good Students
          </NavLink>
          <NavLink className="nav-item nav-link" to="/evilStudents">
            Evil Students
          </NavLink>

          </>
          )}



          
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
