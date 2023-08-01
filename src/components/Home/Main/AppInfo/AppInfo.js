//React
import React, { useContext } from "react";

//Custom Components
import BackButton from "../../../common/BackButton";

//Service
import { LanguageContext } from "../../../../data/LanguageContext";

//Third Party
import { AiOutlineHeart } from 'react-icons/ai'

const AppInfo = ({ onExit }) => {

  //Context
  const language = useContext(LanguageContext);

  return (
    <div style={styles.container}>

              <div style={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                <div style={{marginLeft: "1rem"}}>
                    <BackButton onPress={() => onExit()} hoverColor={"rgba(255,255,255,0.25)"}/>
                </div>
                <div style={{width: "1rem"}}></div>
                <div>
                  <p style={styles.heading}>App-Info</p>
                </div>
              </div>

              <div style={{display: "flex", flexDirection: "column",justifyContent: "center"}}>
                <div style={{display: "flex", flexDirection: "column", backgroundColor: "#131520", borderRadius: 15, width: "90%", maxWidth: 700, margin: "auto"}}>
                  <div style={{height: "1rem"}} ></div>
                  <img style={{height: "4rem", width: "4rem", display: "block", margin: "auto"}} src={require('../../../../data/img/icon.png')}/>
                  <p style={styles.text}>
                    Version 0.0.1 (Early Access)
                  </p>
                </div>

                <div style={{ height: "2rem"}}></div>
                
                <p style={styles.text}>
                  {language.config_authors}
                </p>
                <p style={styles.text2}>
                  royalcaster
                </p>
                <p style={styles.text2}>
                  Ined
                </p>

                <div style={{ height: "2rem"}}></div>

                <div style={styles.text3}>
                  Made in Schneeberg {<AiOutlineHeart style={{color: "#484F78"}}/>}
                </div>
              </div>
    </div>
  );
};

export default AppInfo;

const styles = {
  container: {
    height: "100%",
    width: "100%",
    maxWidth: 700,
    padding: 5
    
  },
  heading: {
    color: "white",
    fontSize: "1.5rem",
    fontFamily: "Poppins",
    textAlign: "left",
  },
  text: {
    alignSelf: "center",
    fontFamily: "Poppins",
    fontSize: "1rem",
    color: "white",
    maxWidth: 250,
    textAlign: "center",
    fontWeight: 300,
  },
  text2: {
    color: "#0080FF",
    alignSelf: "center",
    fontFamily: "Poppins",
    fontWeight: 300,
    fontSize: "1rem",
    maxWidth: 250,
    margin: 0,
    textAlign: "center",
  },
  text3: { 
    fontSize: "1rem",
    color: "#484F78",
    fontFamily: "Poppins",
    fontWeight: 300,
    textAlign: "center"
}
};
