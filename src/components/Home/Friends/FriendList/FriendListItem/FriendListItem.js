//React
import React, { useEffect, useRef, useState } from "react";

//Custom Components
import ProfileImage from "../../../../common/ProfileImage";
import FriendPage from './FriendPage/FriendPage'

//Konstanten
import levels from "../../../../../data/Levels.json";

//Firebase
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../../../../data/FirebaseConfig";
import CustomLoader from "../../../../common/CustomLoader";
import { shadeColor } from "../../../../../data/Service";

const FriendListItem = ({ friend, toggleNavbar, onPress, friendList }) => {
 
  const [hover, setHover] = useState(false)

  return (
    <>
    <div style={{height: "0.25rem"}}></div>
        <div 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          flexDirection: "row",
          width: "95%",
          display: "flex",
          height: 70,
          cursor: "pointer",
          backgroundColor: hover ? shadeColor("#1E2132",-25) : "#1E2132",
          borderRadius: 10,
          margin: "auto"
        }} onClick={() => onPress()}>
              <div style={{display: "flex", flexDirection: "row", alignItems: "center" }}>
                <div style={{ width: 20 }}></div>
                <div
                  style={{zIndex: 2}}
                >
                  <ProfileImage x={50} type={1} url={friend.photoUrl} />
                </div>
                <div style={{ width: "2rem"}}></div>
                <div
                  style={{
                    flexDirection: "row",
                    transform: [{ translateY: 0}],
                    zIndex: 1,
                  }}
                > 
                  <p style={styles.username}>{friend.username}</p>
                </div>
              </div>
        </div>
      <div style={{height: "0.25rem"}}></div>
      </>
  );
};

export default FriendListItem;

const styles = {
  username: {
    color: "rgba(255,255,255,1)",
    fontFamily: "Poppins",
    fontSize: "1rem",
  },
  touchable: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 15,
    display: "flex"
  }
};
