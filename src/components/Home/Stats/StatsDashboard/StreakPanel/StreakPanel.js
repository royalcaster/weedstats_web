//React
import React, { useContext } from "react";
import StateBar from "../StateBar/StateBar";

//Service
import { LanguageContext } from "../../../../../data/LanguageContext";

const StreakPanel = ({ streakData, currentStreak, currentStreakStart, longestStreak, longestStreakStart, longestStreakEnd }) => {
    
  //Context
  const language = useContext(LanguageContext);
  
  return (
        <div style={styles.card_container_wide}>

            <div style={styles.cosmetic}></div>

            <div style={styles.card_container_half}>
              <div style={{flexDirection: "row", width: "100%"}}>
                <p style={styles.card_label}>{language.stats_current_streak}</p>
                <p style={styles.card_value2}>{language.stats_since} {currentStreakStart}</p>
              </div>
                
                <p
                  style={[
                    styles.card_value,
                    streakData.today
                      ? { color: "white" }
                      : { color: "#8a8a8a" },
                  ]}
                >
                  {currentStreak} {currentStreak == 1 ? <p style={{fontSize: 15}}>{language.stats_DAY}</p> : <p style={{fontSize: 15}}>{language.stats_DAYS}</p>}
                </p>
                <StateBar type={"streak"} value={currentStreak}/>

            </div>
            <div style={styles.card_container_half}>
                <div style={{width: "100%", flexDirection: "row"}}>
                  <p style={styles.card_label}>{language.stats_longest_streak}</p>
                  <p style={styles.card_value2}>{longestStreakStart} - {longestStreakEnd}</p>
                </div>
                <p style={styles.card_value}>
                {longestStreak} {longestStreak == 1 ? <p style={{fontSize: 15}}>{language.stats_DAY}</p> : <p style={{fontSize: 15}}>{language.stats_DAYS}</p>}
                </p>
            </div>
        </div>
    )
}

export default StreakPanel

const styles = {
    card_label: {
        color: "white",
        fontFamily: "PoppinsLight",
        fontSize: 11,
        textAlign: "left",
        width: "100%"
      },
      card_value: {
        color: "white",
        fontFamily: "PoppinsBlack",
        fontSize: 22,
        marginTop: -7,
        textAlign: "left",
      },
      card_value2: {
        color: "white",
        fontFamily: "PoppinsLight",
        fontSize: 11,
        position: "absolute",
        right: 0
      },
      card_container_wide: {
        backgroundColor: "#131520",
        margin: 10,
        borderRadius: 10,
        borderTopColor: "#0080FF",
        borderTopWidth: 0
      },
      card_container_half: {
        padding: 15,
        flex: 1
      },
      cosmetic: {
        width: "20%",
        height: 10,
        backgroundColor: "#1E2132",
        opacity: 1,
        alignSelf: "center",
        marginTop: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderRadius: 5
      }
};