//React
import React, { useEffect, useRef, useState } from "react";

//Custom Components
import ProfileImage from "../../../../../common/ProfileImage";
import Button from "../../../../../common/Button";

//Firebase
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../../../../../data/FirebaseConfig";

import { BsCheckLg } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { shadeColor } from "../../../../../../data/Service";


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
              justifyContent: "center",
              display: "flex",
            }}
          >
            <div style={{ flex: 3, display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: 10}}>
              <div
                style={{zIndex: 2, justifyContent: "center", display: "flex", padding: "1rem"}}
              >
                <ProfileImage x={80} type={1} url={user.photoUrl} />
              </div>
              <div style={{ width: "1rem" }}></div>
              <div
                style={{
                  flexDirection: "column",
                  zIndex: 1,
                  justifyContent: "center",
                  flex: 1,
                  display: "flex"
                }}
              >
                <div style={{height: "1rem"}}></div>

                <div style={{flex: 3, display: "flex", flexDirection: "column"}}>
                  <p style={styles.username}>{user.username}</p>
                  <p style={styles.email}>
                    {user.email}
                  </p>
                </div>

                <div style={{height: "1rem"}}></div>

            <div style={{flex: 2, flexDirection: "row", maxHeight: 50, display: "flex"}}>
            <div style={{ flex: 1}}>
              
              <Button onPress={() => onAccept()} color={"#00DB4D"} huge={true} borderradius={10} icon={<BsCheckLg style={{color: "white", fontSize: "1.5rem", marginTop: 3}}/>} hovercolor={shadeColor("#00DB4D",-25)}/>
            </div>
            <div style={{width: "1rem"}}></div>
            <div style={{ flex: 1}}>
              <Button onPress={() => onDecline()} color={"#eb4034"} huge={true} borderradius={10} icon={<IoMdClose style={{color: "white", fontSize: "1.5rem", marginTop: 3}}/>} hovercolor={shadeColor("#eb4034",-25)}/>
            </div>
            <div style={{width: "1rem"}}></div>
            </div>
              <div style={{height: "1rem"}}></div>
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
    backgroundColor: "#131520",
    alignSelf: "center",
    margin: "auto",
    borderRadius: 15,
    overflow: "hidden"
  },
  username: {
    color: "white",
    fontFamily: "Poppins",
    fontSize: "1rem",
    margin: 0
  },
  email: {
    color: "white",
    fontFamily: "Poppins",
    fontSize: "0.8rem",
    margin: 0
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
