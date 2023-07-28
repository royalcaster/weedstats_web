//React
import React, { useEffect, useRef } from "react";

const Empty = ({ title, tip, icon }) => {

  const styles = {
    container: {
      height: "100%",
      width: "100%",
      justifyContent: "center",
      zIndex: 0
    },
    heading: {
      fontFamily: "PoppinsMedium",
      textAlign: "center",
      color: "white",
      fontSize: "1.75rem",
      width: "70%"
    }
  };

  return (
    <div style={{height: "100%", width: "100%", justifyContent: "center", zIndex: 0}}>
      <div style={{ alignItems: "center", width: "90%", alignSelf: "center"}}>
        <img src={require("../../data/img/empty.png")} style={{height: "11%", width: "8%"}}/>
        <div style={{height: "2%"}}></div>
        <p style={{
      fontFamily: "Poppins",
      textAlign: "center",
      color: "white",
      fontSize: "1.75rem",
      width: "70%"
    }}>{title}</p>
        <p style={{
      fontFamily: "Poppins",
      textAlign: "center",
      color: "white",
      fontSize: "1.75rem",
      width: "70%",
      color: "rgba(255,255,255,0.5)"
    }}>
          {tip}
        </p>
      </div>
    </div>
  );
};

export default Empty;
