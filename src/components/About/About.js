//React
import { useState, useEffect, useContext } from 'react';

//Style
import './About.css';
import Features from './components/Features/Features';
import GetTheApp from './components/GetTheApp/GetTheApp';
import HeroShot from './components/HeroShot/HeroShot';
import Idea from './components/Idea/Idea';
import Impressum from './components/Impressum/Impressum';
import Navbar from './components/Navbar/Navbar';
import Support from './components/Support/Support';

//Service
import languages from "./service/languages.json"

const About = () => {

  //State
  const [yOffset, setYOffset] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [language, setLanguage] = useState(languages.de);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const currentYOffset = window.pageYOffset;
    const visible = yOffset > currentYOffset || yOffset < 150;
    setYOffset(currentYOffset);
    setVisible(visible);
  }

  const toggleLanguage = () => {
    language.short === "de" ? setLanguage(languages.en) : setLanguage(languages.de);
  }

  return (
  
    <div className="app_container" onScroll={() => handleScroll()}>
    
      <header>
          <Navbar 
            show={visible} 
            language={language} 
            toggleLanguage={() => toggleLanguage()} 
            navLinks={["#idea", "#features", "#support", "#gettheapp"]}
          />
      </header>
    
      <HeroShot language={language}/>

      <Idea language={language} />

      <Features language={language} />

      <Support language={language} />

      <GetTheApp language={language} />

      <Impressum language={language} />
      
    </div>
  );
}

export default About;
