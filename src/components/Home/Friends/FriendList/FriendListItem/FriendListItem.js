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

const FriendListItem = ({ friend, toggleNavbar, onPress, friendList }) => {

  //State
  const [user, setUser] = useState();
  const [counters, setCounters] = useState();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>

      {!isLoading ? (
        <div style={styles.container}>
            <div style={styles.touchable}>
              <div style={{ flexDirection: "row", alignItems: "center" }}>
                <div style={{ width: 20 }}></div>
                <div
                  style={{zIndex: 2}}
                >
                  {!isLoading ? <ProfileImage x={45} type={1} url={friend.photoUrl} /> : null}
                </div>
                <div style={{ width: "2rem"}}></div>
                <div
                  style={{
                    flexDirection: "row",
                    transform: [{ translateY: 0}],
                    zIndex: 1,
                  }}
                >
                  {!isLoading ? 
                  <p style={styles.username}>{friend.username}</p> : null}
                </div>
              </div>
            </div>
        </div>
      ) : null}
    </>
  );
};

export default FriendListItem;

const styles = {
  container: {
    flexDirection: "row"
  },
  username: {
    color: "rgba(255,255,255,1)",
    fontFamily: "PoppinsMedium",
    fontSize: "1rem",
  },
  touchable: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 15
  }
};
