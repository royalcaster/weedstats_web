//React
import React from "react";

//Tools
import toGermanDate from "../../../../../../data/DateConversion";

//Third Party
import IconButton from "../../../../../common/IconButton";
import TypeImage from "../../../../../common/TypeImage";

const HistoryTable = ({ event, showOnMap }) => {

  return (
    <div style={{
      flexDirection: "row",
      width: "90%",
      marginBottom: 5,
      borderTopColor: "#121212",
      borderTopWidth: 0,
      alignSelf: "center",
      backgroundColor: "#131520",
      justifyContent: "center",
      borderRadius: 10,
      overflow: "hidden"
    }}>
    <div onClick={() => showOnMap(event)}>
    <div
      style={styles.touchable}
    >
      <div style={{ flex: 1, alignItems: "center"}}>
        <TypeImage type={event.type} x={50}/>
      </div>
      
      <div style={{ flex: 2, justifyContent: "center" }}>
        <p style={styles.date}>
          {/* <Fontisto name="date" style={styles.icon_date} /> */}{"  "}
          {toGermanDate(new Date(event.timestamp))}
        </p>
      </div>
      <div style={{ flex: 2, justifyContent: "center" }}>
        <p style={styles.time}>
          {/* <Ionicons name="time-outline" style={styles.icon_time} /> */}{" "}
          {new Date(event.timestamp).toLocaleTimeString("de-DE").substring(0,5)}
        </p>
      </div>
    </div>
    </div>
    </div>
  );
};

export default HistoryTable;

const styles = {
  date: {
    textAlign: "center",
    fontFamily: "PoppinsLight",
    fontSize: "1.5rem",
    color: "white",
    alignSelf: "center",
  },
  time: {
    textAlign: "center",
    fontFamily: "PoppinsLight",
    fontSize: "1.5rem",
    color: "white",
  },
  icon_date: {
    fontSize: 13,
    color: "white",
  },
  icon_time: {
    fontSize: 16,
    color: "white",
  },
  touchable: {
    flexDirection: "row",
    width: "100%",
    padding: 10
  }
};
