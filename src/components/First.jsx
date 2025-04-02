import React from 'react'
import { useNavigate } from "react-router-dom";


const First = () => {

  const navigate = useNavigate();
  const handleNavigation = () => {
    
    console.log("Navigating to /about"); // Debugging log
    navigate("/expense"); // Redirect to About page
};

  return (
    <div className='first'>
      <div className='mid'>

        <div className='mid1'>Take Charge of Your</div>
        <div className="mid2">Finances Effortlessly!!</div>
        <div className='mid3'>
            <p>📊 Track Your Expenses in Real-Time</p>
            <p>💡 Gain Financial Insights & Budget Better</p>
            <p>🔒 Secure & Private – Your Control</p>
        </div>
        <div className="mid4">  <h3><i class="fa-solid fa-calculator"></i> Start Managing Your Money Today !</h3></div>

        <button className='mid5'  onClick={handleNavigation}>🚀Explore <i class="fa-brands fa-codepen"></i></button>



      </div>
    </div>
  )
}

export default First
