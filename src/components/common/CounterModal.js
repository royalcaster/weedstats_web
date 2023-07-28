//React
import React, { useEffect, useRef, useContext } from "react";

//Custom Components
import Button from "./Button";
import CustomLoader from "./CustomLoader";

//Service
import { LanguageContext } from "../../data/LanguageContext";

const CounterModal = ({ onExit, writeComplete, sayingNr, borderColor, loadingColor}) => {

    const language = useContext(LanguageContext);

    useEffect(() => {
      console.log("modal");
    });

    return (
      <>
        <p
            style={styles.container}
          >
            
            <p
                style={{
                  width: "100%",
                  height: "70%",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              >
            {writeComplete ? (
              <>
                <p style={{ flex: 5, justifyContent: "center"}}>
                  <p style={styles.text}>
                    {language.sayings[sayingNr].saying}
                  </p>
                  <p
                    style={styles.text}>
                    {language.sayings[sayingNr].from}
                  </p>
                </p>
                <p style={{ flex: 1, justifyContent: "center" }}>
                  <Button
                    title={"Ok"}
                    color={borderColor == null ? "#0080FF" : borderColor}
                    borderradius={25}
                    fontColor={"white"}
                    onPress={() => {
                      onExit();
                    }}
                    hovercolor={"rgba(255,255,255,0.3)"}
                  />
                </p></>
              
            ) : (
              <p style={{height: "100%", width: "100%", justifyContent: "center"}}>
              <CustomLoader x={80} color={"#484F78"} special={true}/></p>
            )}
            </p>
          </p>
          </>
    );
}

export default CounterModal

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#1E2132",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.85)",
    flex: 1,
    height: "100%"
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  text: {
    alignSelf: "center",
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    color: "white",
    maxWidth: 250,
    textAlign: "center",
    fontSize: 15, 
    fontStyle: "italic", 
    marginTop: 10,
    fontSize: "3rem"
  },
};
