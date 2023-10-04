//React
import React, { useEffect, useRef, useContext } from "react";

//Custom Components
import Button from "./Button";
import CustomLoader from "./CustomLoader";

//Service
import { LanguageContext } from "../../data/LanguageContext";
import { shadeColor } from "../../data/Service";

const CounterModal = ({ onExit, writeComplete, sayingNr, borderColor, loadingColor}) => {

    const language = useContext(LanguageContext);
    return (
      <>
        <div style={styles.container}>
          <div style={{width: "90%", maxWidth: 700, backgroundColor: "#131520", borderRadius: 15}}>
          <div style={{height: "2rem"}}></div>
            {writeComplete ? (
              <>
                  <p style={styles.text}>
                    "{language.sayings[sayingNr].saying}"
                  </p>
                  <div style={{height: "1rem"}}></div>
                  <p
                    style={styles.text2}>
                    {language.sayings[sayingNr].from}
                  </p>
                <div style={{height: "4rem"}}></div>
                  <Button
                    title={"Ok"}
                    color={borderColor == null ? "#0080FF" : borderColor}
                    borderradius={25}
                    fontColor={"white"}
                    onPress={() => {
                      onExit();
                    }}
                    hovercolor={shadeColor(borderColor, -50)}
                  /></>
              
            ) : (
              <div style={{height: "100%", width: "100%", justifyContent: "center"}}>
              <CustomLoader x={80} color={"#484F78"} special={true}/></div>
            )}
            <div style={{height: "2rem"}}></div>
            </div>
          </div>
          </>
    );
}

export default CounterModal

const styles = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  text: {
    alignSelf: "center",
    fontFamily: "Poppins",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontSize: "1.5rem",
    margin: "auto",
    width: "90%"
  },
  text2: {
    alignSelf: "center",
    fontFamily: "Poppins",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontStyle: "italic",
    fontSize: "1rem",
    margin: "auto",
    width: "90%"
  },
};
