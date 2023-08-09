//React
import React, { useState } from "react";

//CSS
import './Button.css'

const Button = ({ icon, title, color, hovercolor, borderradius, onPress, fontColor, color2, disabled, borderColor, huge }) => {

  const [hover, setHover ] = useState(false);

  return (
    <>
    {/*<div className="container" >
       <TouchableNativeFeedback
        onPress={() => {
          onPress();
        }}
        background={TouchableNativeFeedback.Ripple(hovercolor, false)}
        style={{ height: "100%", width: "100%", zIndex: 10000}}
        disabled={disabled}
      >
        <View style={[styles.touchable,{borderColor: borderColor ? borderColor : "rgba(0,0,0,0)", borderWidth: 2}]}>
          <Text> {icon}</Text>
          <Text style={[{ color: fontColor }, styles.title]}>{title}</Text>
        </View>
      </TouchableNativeFeedback> 
    </div>*/}

    <button disabled={disabled} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} title={title} className="button" name={title} onClick={() => onPress()}
    style={{
      backgroundColor: hover ? hovercolor : color,
      borderRadius: borderradius ? borderradius : null,
      color: fontColor,
      borderWidth: 0,
      height: 50,
      fontFamily: "Poppins",
      fontSize: "1rem",
      width: huge ? "100%" : "80%"
    }}>{icon} {title}</button>
    {/* <div className="container2" style={{borderRadius: 5, backgroundColor: color2}}></div> */}
    </>
  );
};

export default Button;
