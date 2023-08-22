//React
import React, { useState } from "react";

//CSS
import './Button.css'

const Button = ({ icon, title, color, hovercolor, borderradius, onPress, fontColor, color2, disabled, borderColor, huge, maxWidth }) => {

  const [hover, setHover ] = useState(false);

  return (
    <>

    <button disabled={disabled} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} title={title} className="button" name={title} onClick={() => onPress()}
    style={{
      backgroundColor: hover ? hovercolor : color,
      borderRadius: borderradius ? borderradius : null,
      color: fontColor,
      borderWidth: 0,
      height: 50,
      fontFamily: "Poppins",
      fontSize: "1rem",
      width: huge ? "100%" : "80%",
      maxWidth: maxWidth ? maxWidth : "100%",
      borderColor: borderColor ? borderColor : "rgba(0,0,0,0)",
      borderWidth: borderColor ? 1 : 0
    }}>{icon} {title}</button>
    {/* <div className="container2" style={{borderRadius: 5, backgroundColor: color2}}></div> */}
    </>
  );
};

export default Button;
