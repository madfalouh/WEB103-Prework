import React from "react";
import { Outlet } from "react-router-dom";
import "./Nav.css";
function Nav() {
  return (
    <>
      <div className="nav-container">
        <div className="buttons-nav">
          <button
            onClick={() => {
              window.location.replace("/");
            }}
          >
            {" "}
            View Creators{" "}
          </button>
          <button
            onClick={() => {
              window.location.replace("/new");
            }}
          >
            {" "}
            ADD A Creator{" "}
          </button>
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
}

export default Nav;
