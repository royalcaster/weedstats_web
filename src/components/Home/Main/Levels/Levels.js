//React
import React, { useRef, useContext } from "react";

//Custom Components
import BackButton from "../../../common/BackButton";
import LevelImage from "../../../common/LevelImage";

//Service
import { LanguageContext } from "../../../../data/LanguageContext";

const Levels = ({ onexit }) => {

  //Context
  const language = useContext(LanguageContext);

  return (
    <div style={styles.container}>

      
      <div style={{height: "100%", top: 0, position: "absolute", width: "100%"}}>
      <div style={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
        <div style={{marginLeft: "1rem"}}>
            <BackButton onPress={() => onexit()}/>
        </div>
        <div style={{width: "1rem"}}></div>
        <div>
          <p style={styles.heading}>{language.account_levels}</p>
        </div>
      </div>

      <div style={{height: "1rem"}}></div>


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
              borderColor: index == language.levels.length - 1 ? "#E6C743" : null,
              borderWidth: index == language.levels.length - 1 ? 3 : null,
              maxWidth: 700,
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 20,
              paddingTop: 5,
              paddingBottom: 5
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
      </div>
    </div>
  );
};

export default Levels;

const styles = {
  container: {
    height: "100%",
    width: "100%",
    padding: 5,
  },
  heading: {
    color: "white",
    fontSize: "1.5rem",
    fontFamily: "Poppins",
    textAlign: "left",
  },
  lvl_img: {
    height: "8%",
    width: "8%",
    marginLeft: 15,
    marginTop: -10
  },
  lvl_name: {
    fontSize: "1.5rem",
    fontFamily: "Poppins",
    color: "white",
    margin: 0
  },
  lvl_bounds: {
    fontFamily: "Poppins",
    fontSize: "1rem",
    margin: 0,
    color: "white",
  }
};
