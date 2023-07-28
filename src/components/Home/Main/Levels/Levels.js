//React
import React, { useRef, useContext } from "react";

//Custom Components
import BackButton from "../../../common/BackButton";
import LevelImage from "../../../common/LevelImage";

//Service
import { LanguageContext } from "../../../../data/LanguageContext";

const Levels = ({ onexit, show }) => {

  //Context
  const language = useContext(LanguageContext);

  //Ref

  const hide = () => {
 
  };

  return (
    <div style={[{ opacity: 1}, styles.container]}>

      
      <div style={{height: "90%", top: 0, position: "absolute", width: "100%"}}>
      <div style={{ height: "5%" }}></div>
      <div style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
        <div style={{marginLeft: 20}}>
            <BackButton onPress={() => hide()}/>
        </div>
        <p style={styles.heading}>{language.account_levels}</p>
      </div>

      <div style={{ height: "2%" }}></div>

      {language.levels.map((level, index) => {
        return (
          <div
            key={index}
            style={{
              alignSelf: "center",
              borderRadius: 10,
              width: "90%",
              backgroundColor: level.colors[0],
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              borderColor: index == language.levels.length - 1 ? "#E6C743" : null,
              borderWidth: index == language.levels.length - 1 ? 3 : null,
              maxWidth: 700,
            }}
          >
            <LevelImage index={index} style={styles.lvl_img} />
            <div style={{ marginLeft: 15 }}>
              <p style={styles.lvl_name}>{level.name}</p>
              {index != language.levels.length - 1 ? (
                <p style={styles.lvl_bounds}>
                  {index * 70}-{(index + 1) * 70 - 1}
                </p>
              ) : (
                <p style={styles.lvl_bounds}>ab {index * 70}</p>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ height: "2%" }}></div>
      </div>
    </div>
  );
};

export default Levels;

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
  lvl_img: {
    height: "8%",
    width: "8%",
    marginLeft: 15,
    marginTop: -10
  },
  lvl_name: {
    fontSize: "2.5rem",
    fontFamily: "PoppinsBlack",
    color: "white",
  },
  lvl_bounds: {
    fontFamily: "PoppinsLight",
    fontSize: "1.75rem",
    marginTop: -5,
    color: "white",
  }
};
