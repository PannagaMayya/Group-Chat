import React from "react";
import "../style/header.css";

function Header({ onCreateGroup, onUsers, onLogout }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="header-button" onClick={onCreateGroup}>
          Create Group
        </button>
      </div>
      <div className="header-right">
        <button className="header-button" onClick={onUsers}>
          Manage Users
        </button>
        <button className="header-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
