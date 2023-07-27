//React
import React from "react";

const LevelImage = ({ index, style }) => {
  switch (index) {
    case 0:
      return (
        <Image
          style={[{
            width: "20%",
            height: "20%"
          }, style]}
          source={require("../../data/img/lvl1.png")}
        />
      );
    case 1:
      return (
        <Image
          style={[{
            width: "20%",
            height: "20%"
          }, style]}
          source={require("../../data/img/lvl2.png")}
        />
      );
    case 2:
      return (
        <Image
          style={[{
            width: "20%",
            height: "20%"
          }, style]}
          source={require("../../data/img/lvl3.png")}
        />
      );
    case 3:
      return (
        <Image
          style={[{
            width: "20%",
            height: "20%"
          }, style]}
          source={require("../../data/img/lvl4.png")}
        />
      );
    case 4:
      return (
        <Image
          style={[{
            width: "20%",
            height: "20%"
          }, style]}
          source={require("../../data/img/lvl5.png")}
        />
      );
    case 5:
      return (
        <Image
          style={[{
            width: "20%",
            height: "20%"
          }, style]}
          source={require("../../data/img/lvl6.png")}
        />
      );
    default:
      return (
        <Image
          style={[{
            width: "20%",
            height: "20%"
          }, style]}
          source={require("../../data/img/lvl7.png")}
        />
      );
  }
};

export default LevelImage;
