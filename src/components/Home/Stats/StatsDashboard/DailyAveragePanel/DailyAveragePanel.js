//React
import React, { useContext } from "react";

//Service
import { LanguageContext } from "../../../../../data/LanguageContext";
import TypeImage from "../../../../common/TypeImage";

const DailyAveragePanel = ({selectedType, value}) => {

    //Context
    const language = useContext(LanguageContext);

    return (<div  style={{borderRadius: 10, padding: 20, width: "100%"}}>

    <div style={{alignSelf: "center"}}>
      {selectedType == "main" ? <TypeImage x={60}/> : 
      <TypeImage type={selectedType} x={60}/>}
    </div>
    
    <div style={{height: "1rem"}}></div>

    <div style={{alignSelf: "center"}}>
    <p
      style={styles.value}
    >
      {value}
    </p>
    <p
      style={styles.time_tag}
    >
      Ø {language.stats_day}
    </p>
    </div>

    </div>)
}

export default DailyAveragePanel

const styles = {
      time_tag: {
        fontSize: "2rem",
        color: "white",
        fontFamily: "Poppins",
      },
      value: {
        fontSize: "3rem",
        color: "white",
        fontFamily: "Poppins",
        fontWeight: 700
      }
};