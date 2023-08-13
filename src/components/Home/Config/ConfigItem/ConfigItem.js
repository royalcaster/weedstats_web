//React
import React, { useContext, useState } from "react";

//Third Party
import { LanguageContext } from "../../../../data/LanguageContext";

//Custom Component
import TypeImage from '../../../common/TypeImage'

import "react-toggle/style.css" // for ES6 modules
import Toggle from "react-toggle";

const ConfigItem = ({ type, config, onToggle }) => {

  return (
    <div style={{
      backgroundColor: config ? "#484F78" : "#131520",
      margin: "0.5rem",
      borderRadius: 10, 
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      cursor: "pointer"
    }}
    onClick={() => onToggle()}>
      <div style={{height: "0.5rem"}}></div>
      <TypeImage x={60} type={type}/>
      <div style={{height: "0.5rem"}}></div>
    </div>
  );
};

export default ConfigItem;

const styles = {
  container: {
    margin: 2.5,
    borderRadius: 10,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#131520",
    flex: 1,
  },
  touchable: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  }
};
