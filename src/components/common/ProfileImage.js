//React
import React from "react";

const ProfileImage = ({ x, url, type, circle, circleColor }) => {
  return (
    <div
      style={{
        height: x,
        width: x,
        borderRadius: type == 1 ? 100 : 0,
        overflow: "hidden",
        zIndex: 0,
        borderColor: circleColor,
        borderWidth: circle ? 2 : 0,
        display: "block",
        margin: "auto"
      }}
    >
      <img style={{ height: "100%" }} src={url} />
    </div>
  );
};

export default ProfileImage;
