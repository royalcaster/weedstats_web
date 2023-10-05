//React
import { useState, useEffect, useContext } from 'react';

//Style
import '../../About.css'
import LanguageSelector from './LanguageSelector/LanguageSelector';

//Custom Components
import NavbarLink from './NavbarLink/NavbarLink'

import { FiMenu } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import Button from '../../../common/Button';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../data/UserContext';
import { shadeColor } from '../../../../data/Service';

const Navbar = ({ show, language, toggleLanguage, navLinks, onLinkClick }) => {

  //State
  const [className, setClassName] = useState("navbar_container");
  const [showMenu, setShowMenu] = useState(false);

  //Context
  const user = useContext(UserContext);

  //Hooks
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setClassName("navbar_container")
    }
    else {
      setClassName("navbar_container hide_navbar")
    }
  },[show]);

  return (
    <>

    {showMenu ? 
    <div className='menu_container'>
      <NavbarLink title={language.navbar_idea} link={navLinks[0]} onClick={() => setShowMenu(false)}/>
      <NavbarLink title={language.navbar_features} link={navLinks[1]} onClick={() => setShowMenu(false)}/>
      <NavbarLink title={language.navbar_support} link={navLinks[2]} onClick={() => setShowMenu(false)}/>
      <NavbarLink title={language.navbar_get_the_app} link={navLinks[3]} onClick={() => setShowMenu(false)}/>
      <div style={{width: "50", maxWidth: 400}}>{user != null ? <Button
                        title={"Zur App"}
                        onPress={() => navigate("/home/counter")}
                        borderradius={10}
                        color={"#131520"}
                        fontColor={"#409FFF"}
                        borderColor={"#409FFF"}
                        hovercolor={shadeColor("#131520",-25)}
                      /> : null}
      </div>
      <LanguageSelector language={language} toggleLanguage={toggleLanguage}/>
    </div> : null}

    <div className={className} id="navbar">
      <div style={{maxWidth: "1200px", display: "flex", width: "100vw", padding: "0.25rem", paddingLeft: "1rem", paddingRight: "1rem", marginLeft: "auto", marginRight: "auto"}}>

      <div style={{flex: 1, flexDirection: "row", display: "flex", alignItems: "center"}}>
        <img src={require("./img/icon.png")} alt='WeedStats Logo' className='logo' height={50} width={50}/>
        <div style={{width: "15px"}}></div>
        <div style={{display: "flex", alignItems: "center", height: "100%"}}>
          <p className='navbar_heading'>WeedStats Homepage</p>
        </div>
      </div>
      <div className='navbar_link_container'>
        <NavbarLink title={language.navbar_idea} link={navLinks[0]}/>
        <NavbarLink title={language.navbar_features} link={navLinks[1]}/>
        <NavbarLink title={language.navbar_support} link={navLinks[2]}/>
        <NavbarLink title={language.navbar_get_the_app} link={navLinks[3]}/>
        <LanguageSelector language={language} toggleLanguage={toggleLanguage}/>
      </div>

      <div className='navbar_menu_container' onClick={() => {showMenu ? setShowMenu(false) : setShowMenu(true)}}>
        <p>{showMenu ? 
        <AiOutlineClose className='menu_icon'/> 
        : <FiMenu className='menu_icon'/>}</p>
      </div>

      </div>
    </div>
    </>
  );
}

export default Navbar;
