//React
import React, { useContext, useEffect, useRef } from "react";

//Custom Components
import Statusbar from "./StatusBar/Statusbar";
import Slider from './Slider/Slider'

//Service
import { LanguageContext } from "../../../../data/LanguageContext";
import LevelBar from "./LevelBar/LevelBar";
import TypeImage from "../../../common/TypeImage";
import LevelImage from "../../../common/LevelImage";

const CounterItem = ({ type, counter, toggleCounter, toggleBorderColor }) => {

  const language = useContext(LanguageContext);

  const calcLevelStatus = (counter) => {

    if (counter == null) {
      return 0;
    }

    if (counter >= 420) {
      return 100;
    } else if (counter == 0) {
      return 0;
    } else {
      var indicator = Math.ceil(counter / 70);
      return (100 * (counter - 70 * (indicator - 1))) / 70;
    }
  };

  const getGradientColors = (counter) => {
    if (counter) {
      if (counter == 0) {
        return ["rgba(255,255,255,0.75), rgba(255,255,255,0.5)"]
      }
      else {
        let indicator = Math.floor(counter / 70);
        return indicator > language.levels.length - 1
          ? language.levels[language.levels.length - 1].colors
          : language.levels[indicator].colors;
      }
    }
    else {
      return ["#484F78", "#484F78", "#1E2132"]
    }
  };

  const convertToRGB = ( hex, a) => {
    if(hex.length != 6){
        throw "Only six-digit hex colors are allowed.";
    }

    var aRgbHex = hex.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16),
        a
    ];
    return "rgba(" + aRgb[0] + ", " + aRgb[1] + ", " + aRgb[2] + ", " + a + ")";
  }

  return (
    <div style={styles.container}>

      {/* <div style={{position: "relative", alignSelf: "center", zIndex: 10000, justifyContent: "center", top: -30}}>
        <LevelImage index={Math.floor(counter / 70)} style={{width: "8%", height: "8%", alignSelf: "center"}}/>
      </div> */}

      <div style={{backgroundColor: convertToRGB(getGradientColors(counter)[0].substring(1,7), 0.4), borderColor: getGradientColors(counter)[0], borderWidth: 0.5, flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingRight: 20,
        display: "flex"}}>
        <div style={{height: 60, width: 60, justifyContent: "center", borderRadius: 10}}>
          <TypeImage type={type} x={60} backgroundColor={getGradientColors(counter)[0]}/>
        </div>
      </div>
      
      <div style={styles.card_content}>
        <div style={{flex: 6}}>
          <div style={styles.grab}></div>
          <div style={{height: "1rem"}}></div>
          <div style={{flex: 1, flexDirection: "row", display: "flex"}}>
            <div style={{flex: 2, alignItems: "center", flexGrow: 3}}>
              <p style={styles.counter_number}>{counter > 0 ? counter : "0"}</p>
            </div>
            <div style={{display: "flex", flex: 5, padding: 5}}>
              <Statusbar status={calcLevelStatus(counter)} />
            </div>
          </div> 
          <div style={{height: "0.5rem"}}></div>
          <div style={{display: "flex", flex: 3, padding: 10, paddingTop: 5}}>
            <Slider firstColor={getGradientColors(counter)[0]} secondColor={getGradientColors(counter)[2]} onToggleCounter={() => {toggleCounter(type.toLowerCase(), getGradientColors(counter)[0]); toggleBorderColor(getGradientColors(counter)[0])}}/>
          </div>
          <div style={{height: "0.5rem"}}></div>
        </div>  
        <div style={{flex: 1, flexDirection: "column", display: "flex"}}>
          <LevelBar index={Math.floor(counter / 70)} counter={counter}/>
        </div>
        
      </div> 
    </div>
  );
};

export default CounterItem;

const styles = {
  container: {
    margin: 5,
    marginTop: 20,
    flexDirection: "row",
    display: "flex",
  },
  counter_number: {
    color: "white",
    fontSize: "2.5rem",
    fontFamily: "Poppins",
    fontWeight: 700,
    textAlign: "center",
    margin: 0
  },
  card_opener: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingRight: 20
  },
  card_content: {
    flex: 5,
    display: "flex",
    backgroundColor: "#131520",
    borderRadius: 10,
    marginLeft: -20,
    flexDirection: "row"
  },
  grab: {
    alignSelf: "center",
    height: 5,
    width: "25%",
    borderRadius: 10,
    zIndex: 1000,
    marginVertical: 15,
    marginBottom: 5,
    backgroundColor: "#484F78",
    margin: "auto",
    marginTop: 10
  }
};
