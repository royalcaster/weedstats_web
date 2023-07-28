//React
import React from "react";

const LevelImage = ({ index, style }) => {
  switch (index) {
    case 0:
      return (
        <img
          style={{
            width: "20%",
            height: "20%"
          }}
          src={require("../../data/img/lvl1.png")}
        />
      );
    case 1:
      return (
        <img
          style={{
            width: "20%",
            height: "20%"
          }}
          src={require("../../data/img/lvl2.png")}
        />
      );
    case 2:
      return (
        <img
          style={{
            width: "20%",
            height: "20%"
          }}
          src={require("../../data/img/lvl3.png")}
        />
      );
    case 3:
      return (
        <img
          style={{
            width: "20%",
            height: "20%"
          }}
          src={require("../../data/img/lvl4.png")}
        />
      );
    case 4:
      return (
        <img
          style={{
            width: "20%",
            height: "20%"
          }}
          src={require("../../data/img/lvl5.png")}
        />
      );
    case 5:
      return (
        <img
          style={{
            width: "20%",
            height: "20%"
          }}
          src={require("../../data/img/lvl6.png")}
        />
      );
    default:
      return (
        <img
          style={{
            width: "20%",
            height: "20%"
          }}
          src={require("../../data/img/lvl7.png")}
        />
      );
  }
};

export default LevelImage;
