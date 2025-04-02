import React from 'react'
import { useState } from 'react';
import { NavLink } from "react-router-dom";


const Nav = () => {

  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className='nav'>
      <div className="head">Expenzo</div>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <div className={`link ${isOpen ? "open" : ""}`}>
            <NavLink  to="/first" className="nav-link"><ul><i className="fa-solid fa-house"></i> Home</ul></NavLink>
            <NavLink to="/expense" className="nav-link"><ul><i className="fa-solid fa-money-check-dollar"></i> Expenses</ul></NavLink>
            <NavLink to="/contact" className="nav-link"><ul><i className="fa-brands fa-connectdevelop"></i> Contact</ul></NavLink>
        
      </div>
    </div>
  )
}

export default Nav
