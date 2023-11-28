import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="button link bump-down">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button-79 button-smaller">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key={"profile"}>
      <Link to="/profile" className="button link bump-down">My Profile</Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];
  
  let indexPages
  if (user) {
      indexPages = (
        <>
          <li>
            <Link to="/artists" className="button link bump-down">Artists</Link>
          </li>
          <li>
            <Link to="/venues" className="button link bump-down">Venues</Link>
          </li>
        </>
      )
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text bump-down">GigFinder</li>
          <li>
            <Link to="/" className="button link bump-down">Home</Link>
          </li>
          {indexPages}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
