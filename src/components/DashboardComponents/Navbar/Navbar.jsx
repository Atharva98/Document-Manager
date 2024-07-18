// Navbar.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div className="navbar">
      <div className="navbar-brand">
        File Management System
      </div>
      <div className="navbar-user">
        Welcome, {user ? user.displayName : 'Guest'}
      </div>
    </div>
  );
};

export default Navbar;
