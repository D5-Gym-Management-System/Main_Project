import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import '../../Page_Styling/navbar.css';

function Navbar() {
  // useEffect(() => {
  //   // Wait for the document to be ready before using jQuery
  //   $(document).ready(() => {
  //     // Initialize dropdowns when the component mounts
  //     $('.dropdown-toggle').dropdown()
  //   });
  // }, []);
const navigate=useNavigate();
  
  return (
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link " onClick={()=>navigate("/home")}>Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={()=>navigate("/login")}>Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={()=>navigate("/register")}>Register</a>
        </li>
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Features</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" onClick={()=>navigate("/Timings")}>Timings</a>
            <a className="dropdown-item" onClick={()=>navigate("/images")}>Photos</a>
            <a className="dropdown-item" onClick={()=>navigate("/rules")}>Rules</a>
      
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={()=>navigate("/plans")}>Subscription Plans</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={()=>navigate("/contactus")}>Contact Us</a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" onClick={()=>navigate("/cart")}>Cart</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={()=>navigate("/products")}>Products</a>
        </li> */}
      </ul>
      </nav>
  );
}

export default Navbar;