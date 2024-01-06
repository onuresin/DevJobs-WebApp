import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const handleThemeChange = () => {
    setDarkTheme(!darkTheme);
  };

  return (
      <div className="container">
        <div className="navHeader">
            <Link to="/"><img src="/public/images/devjobs.svg" alt="DevJobs Logo" /></Link>
          <div className="theme-changer" onClick={handleThemeChange}>
            {darkTheme ? 
            (<img src="/public/images/light-group.svg"/>) 
            : 
            (<img src="/public/images/dark-group.svg" />)
            }
          </div>
      </div>
      </div>
  );
}