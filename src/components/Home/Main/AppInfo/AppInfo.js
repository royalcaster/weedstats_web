//React
import React, { useRef, useContext } from "react";

//Custom Components
import BackButton from "../../../common/BackButton";

//Service
import { LanguageContext } from "../../../../data/LanguageContext";

//Third Party

const AppInfo = ({ onExit, show }) => {

  //Context
  const language = useContext(LanguageContext);

  const hide = () => {
   
  };

  return (
    <div style={styles.container}>

              <div style={{ height: "5%" }}></div>

              <div style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                <div style={{marginLeft: 20}}>
                    <BackButton onPress={() => hide()}/>
                </div>
                <p style={styles.heading}>App-Info</p>
              </div>

              <div style={{flex: 1, justifyContent: "center"}}>
                <img style={{height: "12%", width: "12%", alignSelf: "center"}} src={require('../../../../data/img/logo.png')}/>
                <p style={[styles.text, { fontSize: "2rem" }]}>
                  Version 0.0.1 (Early Access)
                </p>

                <div style={{ height: "5%"}}></div>
                
                <p style={[styles.text, { fontSize: "2.5rem" }]}>
                  {language.config_authors}
                </p>
                <p style={[styles.text, { fontSize: "2rem", color: "#0080FF" }]}>
                  royalcaster{"\n"}
                  Ined{"\n"}
                  {/* yung lillo */}
                </p>

                <div style={{ height: "5%"}}></div>

                <div style={[styles.text, { fontSize: "1.8rem", color: "white", fontFamily: "PoppinsLight"}]}>
                  Made in Schneeberg {/* <Entypo style={{fontSize: "1.8rem"}} name="heart-outlined"/> */}
                </div>

                <div style={{ height: "10%"}}></div>
              </div>
    </div>
  );
};

export default AppInfo;

const styles = {
  container: {
    marginTop: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#131520",
    paddingBottom: 30,
    zIndex: 1,
    position: "absolute",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontFamily: "PoppinsMedium",
    marginLeft: 20,
    textAlign: "left",
    marginTop: 3
  },
  text: {
    alignSelf: "center",
    fontFamily: "PoppinsLight",
    fontSize: "2rem",
    color: "white",
    maxWidth: 250,
    textAlign: "center",
  }
};
