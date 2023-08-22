//React
import React, { useEffect, useRef, useState } from "react";

//Custom Components
import ProfileImage from "../../../../../common/ProfileImage";

//Firebase
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../../../../../data/FirebaseConfig";


const RequestItem = ({ userid, onAccept, onDecline }) => {
  
  useEffect(() => {
    loadUser();
  }, []);

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    try {
      const docRef = doc(firestore, "users", userid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser({
          username: docSnap.data().username,
          photoUrl: docSnap.data().photoUrl,
          email: docSnap.data().email
        });
      }
    } catch (e) {
      console.log("Error:", e);
    }
    setIsLoading(false);
    animate();
  };

  return (
    <>
      {!isLoading ? (
        <div style={styles.container}>
          <div
            style={{
              flexDirection: "column",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div style={{ flex: 3, flexDirection: "row", width: "100%", height: "100%", padding: 10}}>
              <div
                style={{zIndex: 2, justifyContent: "center"}}
              >
                <ProfileImage x={80} type={1} url={user.photoUrl} />
              </div>
              <div style={{ width: 20 }}></div>
              <div
                style={{
                  flexDirection: "column",
                  transform: [{ translateX: 0 }],
                  zIndex: 1,
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <div style={{flex: 3, justifyContent: "center"}}>
                  <p style={styles.username}>{user.username}</p>
                  <p style={styles.username}>
                    {user.email}
                  </p>
                </div>

            <div style={{flex: 2, flexDirection: "row", maxHeight: 50}}>
            <div style={{ flex: 1, backgroundColor: "#eb4034", borderRadius: 10, overflow: "hidden"}}>
              <div onClick={() => onDecline()}>
                <div style={styles.touchable}>
                  {/* <Feather
                    name="x"
                    style={[styles.icon, { color: "white" }]}
                  /> */}
                </div>
              </div>
            </div>
            <div style={{width: 10}}></div>
            <div style={{ flex: 1, borderRadius: 10, backgroundColor: "#00DB4D"}}>
              <div onClick={() => onAccept()}>
                <div style={styles.touchable}>
                  {/* <Feather
                    name="check"
                    style={[styles.icon, { color: "white" }]}
                  /> */}
                </div>
              </div>
            </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RequestItem;

const styles = {
  container: {
    flexDirection: "row",
    height: 120,
    width: "90%",
    backgroundColor: "#1E2132",
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden"
  },
  username: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: "PoppinsBlack",
    fontSize: 15,
    fontFamily: "PoppinsLight",
    fontSize: 12,
    marginTop: -3 
  },
  touchable: {
    width: "100%",
    justifyContent: "center",
    height: "100%",
  },
  icon: {
    textAlign: "center",
    fontSize: 30,
  },
};
