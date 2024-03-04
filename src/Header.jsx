import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import lightTheme from '../Public/images/light-group.svg'
import darkButton from '../Public/images/dark-group.svg'
import devJobs from '../public/images/devjobs.svg'

export default function Header() {
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('darkTheme') === 'true' || false);

  const handleThemeChange = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    localStorage.setItem('darkTheme', darkTheme.toString());
    document.body.classList.toggle('dark-theme', darkTheme);
  }, [darkTheme]);

  return (
    <>
      <div className="navHeader">
        <Link to="/"><img src={devJobs} alt="DevJobs Logo" /></Link>
        <div className="theme-changer" onClick={handleThemeChange}>
          {darkTheme ? 
            (<img src={darkButton} alt="Dark Theme Icon" />) 
            : 
            (<img src={lightTheme} alt="Light Theme Icon" />)
          }
        </div>
      </div>
    </>
  );
}