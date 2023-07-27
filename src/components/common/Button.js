//React
import React, { useState } from "react";

//CSS
import './Button.css'

const Button = ({ icon, title, color, hovercolor, borderradius, onPress, fontColor, color2, small, disabled, borderColor }) => {

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

    <button title={title} className="button" name={title} onClick={() => onPress()}>{title}</button>
    
    <div className="container2" style={{borderRadius: 5, backgroundColor: color2}}></div>
    </>
  );
};

export default Button;