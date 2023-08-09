//React
import React, { useContext, useState } from "react";

//Third Party
import { LanguageContext } from "../../../../data/LanguageContext";

//Custom Component
import TypeImage from '../../../common/TypeImage'

import "react-toggle/style.css" // for ES6 modules
import Toggle from "react-toggle";

const ConfigItem = ({ type, config, onToggle }) => {

  const [active, setActive] = useState(config);

  return (
    <div style={{backgroundColor: config ? "#484F78" : "#131520", margin: 2.5,
    borderRadius: 10,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#131520",
    flex: 1,}}>
      {/* <TouchableNativeFeedback 
      onPress={() => {
        onToggle(type);
        setActive(!active);
      }}
      background={TouchableNativeFeedback.Ripple(
        "rgba(255,255,255,0.1)",
        true
      )}>
        <div style={styles.touchable}>
          <TypeImage x={50} type={type}/>
        </div>
      </TouchableNativeFeedback> */}
      <p>config item</p>
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
