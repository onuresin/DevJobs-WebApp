import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

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
        <Link to="/"><img src="/public/images/devjobs.svg" alt="DevJobs Logo" /></Link>
        <div className="theme-changer" onClick={handleThemeChange}>
          {darkTheme ? 
            (<img src="/public/images/dark-group.svg" alt="Dark Theme Icon" />) 
            : 
            (<img src="/public/images/light-group.svg" alt="Light Theme Icon" />)
          }
        </div>
      </div>
    </>
  );
}