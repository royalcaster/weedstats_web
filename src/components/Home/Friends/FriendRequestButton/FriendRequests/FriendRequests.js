//React
import React, { useContext, useEffect, useRef, useState } from "react";

//Custom Components
import Empty from "../../../../common/Empty";
import BackButton from "../../../../common/BackButton";
import RequestItem from "./RequestItem/RequestItem";
import CustomLoader from "../../../../common/CustomLoader";


//Firebase
import {
  doc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import { firestore } from "../../../../../data/FirebaseConfig";

//Service
import { UserContext } from "../../../../../data/UserContext";
import { LanguageContext } from "../../../../../data/LanguageContext";
import CustomModal from "../../../../common/CustomModal";

const FriendRequests = ({ onExit, refreshUser, getFriendList }) => {

  //Context
  const user = useContext(UserContext);
  const language = useContext(LanguageContext);

  //State
  const [modalVisible, setModalVisible] = useState(false);
  const [activeRequested, setActiveRequested] = useState(null);
  const [alreadySent, setAlreadySent] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    var resultBuffer = [];

    try {
      const docRef = doc(firestore, "users", user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        resultBuffer = docSnap.data().requests;
      }
    } catch (e) {
      console.log("Error", e);
    }
    setResults(resultBuffer);
    setLoading(false);
  };

  const makeFriendRequest = async (id) => {
    const docRef = doc(firestore, "users", id);
    const docSnap = await getDoc(docRef);

    var requested;
    if (docSnap.exists()) {
      requested = {
        id: docSnap.data().id,
        requests: docSnap.data().requests,
      };
    }

    if (requested.requests.includes(user.id)) {
      console.log("Anfrage bereits gesendet!");
      setAlreadySent(true);
    } else {
      try {
        const docRef = doc(firestore, "users", requested.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          var buffer = docSnap.data().requests;
          updateDoc(docRef, {
            requests: buffer.concat(user.id),
          }).then(() => {
            alert("Invite sent")
          });
        }
      } catch (e) {
        console.log("Error:", e);
      }
    }
    setModalVisible(false);
  };

  const acceptFriend = async (id) => {
    setLoading(true);

    const docRef = doc(firestore, "users", user.id);
    const docRef2 = doc(firestore, "users", id);

    var buffer = results.filter((item) => item != id);
    updateDoc(docRef, {
      requests: buffer,
    });

    var friends_buffer;
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      friends_buffer = docSnap.data().friends;
    }

    friends_buffer.push(id);

    updateDoc(docRef, {
      friends: friends_buffer,
    });

    refreshUser({
      friends: friends_buffer,
      requests: buffer
    });

    const docSnap2 = await getDoc(docRef2);
    if (docSnap2.exists()) {
      friends_buffer = docSnap2.data().friends;
    }

    friends_buffer.push(user.id);

    updateDoc(docRef2, {
      friends: friends_buffer,
    });

    /* getFriendList(); */
    loadRequests();
    setLoading(false);
  };

  const declineFriend = async (result) => {
    setLoading(true);
    const docSnap = await getDoc(doc(firestore, "users", user.id));
    var requests;
    if (docSnap.exists()) {
      requests = docSnap.data().requests;
      var new_array = requests.filter(r => r != result);
      await updateDoc(doc(firestore, "users", user.id),{
        requests: new_array
      });
      setResults(new_array);
    }
    refreshUser({
      requests: new_array
    });
    loadRequests();
    setLoading(false);
  }


  const modalContent = <div
  style={{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  }}
>
  <div style={styles.modal_container}>
    {!alreadySent ? (
      <>
        <div style={{ flex: 1, justifyContent: "center" }}>

            {language.language_short == "de" ? 
            <p style={styles.heading}>
              <p>{activeRequested ? activeRequested.username : null}</p>{language.send_request}
            </p> 
            : 
            <p style={styles.heading}>
              {language.send_request}
            <p>{activeRequested ? activeRequested.username : null}</p> ?</p>}

          </div>
        <div style={{ flex: 1, flexDirection: "row" }}>
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div onClick={() => setModalVisible(false)}>
              <div style={styles.touchable}>
                {/* <Antdesign
                  name="close"
                  style={[styles.icon, { color: "#eb4034" }]}
                /> */}
              </div>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div onClick={() => makeFriendRequest(activeRequested.id)}>
              <div style={styles.touchable}>
                {/* <Antdesign
                  name="check"
                  style={[styles.icon, { color: "#3BA426" }]}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <div style={{ flex: 1, justifyContent: "center" }}>
        {/* <Antdesign style={styles.info_icon} name="exclamationcircleo" /> */}
        <div style={{ height: 30 }}></div>
          {language.language_short == "de" ? 
          <p style={styles.heading}>
            <p>{activeRequested ? activeRequested.username : null}</p>{language.already_sent}
          </p>
          :
          <p style={styles.heading}>
            {language.already_sent}<p>{activeRequested ? activeRequested.username : null}</p>
          </p>}
        <div
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div onPress={() => setModalVisible(false)}>
            <div style={styles.touchable}>
              {/* <Antdesign
                name="close"
                style={[styles.icon, { color: "#eb4034" }]}
              /> */}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

  return (
    <div
      style={styles.container}
    >

      <div style={{maxWidth: 700, margin: "auto"}}>

      <CustomModal show={modalVisible} child={modalContent}/>

      <div style={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
            <div style={{marginLeft: "1rem"}}>
                <BackButton onPress={() => onExit()} hoverColor={"rgba(255,255,255,0.25)"}/>
            </div>
            <div style={{width: "1rem"}}></div>
            <div>
            <p style={styles.heading}>{language.friendrequests_title}</p>
            </div>
        </div>

        {loading ? (
          <div style={{height: "50%", justifyContent: "center", display: "flex", alignItems: "center"}}>
            <CustomLoader x={50} color={"#484F78"}/>
          </div>
        ) : (
          <>
            {results ? (
              <div style={{ width: "100%", flex: 1, alignSelf: "center", marginTop: 20}} >
                {results.length != 0 ? (
                  results.map((result) => {
                    return (
                      <RequestItem
                        key={Math.random()}
                        userid={result}
                        onAccept={() => acceptFriend(result)}
                        onDecline={() => declineFriend(result)}
                      />
                    );
                  })
                ) : 
                <div style={{height: "100%"}}>
                  <div style={{height: "5rem"}}></div>
                  <Empty title={language.requests_no_requests}/>
                </div>}
              </div>
            ) : 
            null}
          </>
        )}
      </div>
    </div>
  );
};

export default FriendRequests;

const styles = {
  container: {
    width: "100vw",
    position: "absolute",
    backgroundColor: "#1E2132",
    height: "100vh",
    top: 0
  },
  modal_container: {
    backgroundColor: "#1E2132",
    width: "90%",
    height: 300,
    alignSelf: "center",
    borderRadius: 25,
    flexDirection: "column",
  },
  heading: {
    color: "white",
    fontSize: "1.5rem",
    fontFamily: "Poppins",
    textAlign: "left",
  },
  touchable: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 40,
  },
  info_icon: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
  },
  empty: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "center",
    fontFamily: "PoppinsLight",
    fontSize: 12,
  },
};
