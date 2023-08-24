//React
import React, { useContext, useEffect, useRef, useState } from "react";

//Custom Components
import BackButton from "../../../../../common/BackButton";
import CustomLoader from "../../../../../common/CustomLoader";
import ProfileImagePanel from '../../../../../common/ProfileImagePanel'
import Button from "../../../../../common/Button";
import IconButton from "../../../../../common/IconButton";
import CustomMarker from "../../../../../common/CustomMarker";
import CustomModal from "../../../../../common/CustomModal";

//Konstanten
import levels from "../../../../../../data/Levels.json";

import './FriendPage.css'

//Firebase
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { firestore } from "../../../../../../data/FirebaseConfig";

//Service
import {UserContext} from '../../../../../../data/UserContext'
import { LanguageContext } from "../../../../../../data/LanguageContext";
import { downloadUser } from '../../../../../../data/Service'
import { ConfigContext } from '../../../../../../data/ConfigContext'
import toGermanDate from "../../../../../../data/DateConversion";
import { mapStyle } from "../../../../../../data/CustomMapStyle";
import { uuidv4 } from "@firebase/util";
import TypeImage from "../../../../../common/TypeImage";
import Empty from "../../../../../common/Empty";
import MemberSince from "../../../../../common/MemberSince";

import './FriendPage.css'

const FriendPage = ({ show, user, onExit, refreshUser, onRemoveFriend }) => {

  //Context
  const language = useContext(LanguageContext);
  const realuser = useContext(UserContext);
  const config = useContext(ConfigContext);
    
  //Constants
  /* const switch_icon = <AntDesign name={"picture"} style={{fontSize: 20, color: "white"}}/> */

  //State
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showProfilePicture, setShowProfilePicture] = useState(false);
  const [friendConfig, setFriendConfig] = useState();
  const [showMap, setShowMap] = useState(false);
  const [mapType, setMapType] = useState("standard");
  const [headerClass, setHeaderClass] = useState("")

  useEffect(() => {
    if (user) {
      getFriendConfig();
    }
  },[user]);

  const getFriendConfig = async () => {
    const config = await downloadUser(user.id, true);
    setFriendConfig(config);
    setLoading(false);
  }

  const chopUrl = (url) => {
    var result;
    result = url.replace("s96-c", "s300-c");
    return result;
  };

  const chopTimeStamp = (timestamp) => {
    var a = new Date(timestamp);

    return a.toTimeString().substring(0, 5) + " Uhr";
  };

  const removeFriend = async (id) => {
    setLoading(true);
    try {
      const docRef = doc(firestore, "users", realuser.id);
      const docSnap = await getDoc(docRef);

      var buffer;
      if (docSnap.exists()) {
        buffer = docSnap.data().friends;
      }

      updateDoc(docRef, {
        friends: buffer.filter((item) => item != id),
      });

      refreshUser({
        friends: buffer.filter((item) => item != id)
      });
    } catch (e) {
      console.log("Error", e);
    }

    try {
      const docRef = doc(firestore, "users", id);
      const docSnap = await getDoc(docRef);

      var buffer;
      if (docSnap.exists()) {
        buffer = docSnap.data().friends;
      }

      updateDoc(docRef, {
        friends: buffer.filter((item) => item != realuser.id),
      });
    } catch (e) {
      console.log("Error", e);
    }
    setModalVisible(false);
    onRemoveFriend();
  };

  const toggleMapType = () => {
    mapType == "standard" ? setMapType("hybrid") : setMapType("standard");
  }

 const mapModalContent = !loading ?  <>
 <div style={{height: "100%", width: "100%", position: "absolute", top: 0, zIndex: 1000000}}>

 <div style={{bottom: 50, position: "absolute", width: "100%", flexDirection: "column", zIndex: 1}}>
    <div style={{zIndex: 1, alignSelf: "center"}}>
      <IconButton /* icon={switch_icon} */ onPress={toggleMapType}/>
    </div>
    <div style={{height: "2rem"}}></div>
      <Button title={language.account_delete_account_cancel} color={"#eb4034"} borderradius={100} onPress={() => setShowMap(false)} fontColor={"white"}/>
 </div>

 {/* <MapView
   provider={PROVIDER_GOOGLE}
   initialRegion={{
       longitude: user.last_entry_longitude,
       latitude: user.last_entry_latitude,
       longitudeDelta: 0.02,
       latitudeDelta: 0.02
   }}
   style={styles.map}
   customMapStyle={mapStyle}
   showsUserLocation={true}
   followsUserLocation={true}
   showsCompass={false}
   showsTraffic={false}
   showsIndoors={true}
   mapType={mapType}
   pitchEnabled={true}
   showsMyLocationButton={false}
   >
     <><Marker
         tracksViewChanges={false}
         key={uuidv4()}
         coordinate={{
             latitude: user.last_entry_latitude,
             longitude: user.last_entry_longitude,
         }}
         >
           <CustomMarker
               photoUrl={user.photoUrl}
               username={user.username}
               type={user.last_entry_type}
               timestamp={user.last_entry_timestamp}
               withOutDate={true}
           />
         </Marker>
       </>
   </MapView>  */}
 </div>
 </> : null;

 const deleteFriendModalContent = !loading ? <div
 style={{
   flex: 1,
   alignItems: "center",
   justifyContent: "center",
   backgroundColor: "rgba(0,0,0,0.5)"
 }}>
 <div style={styles.modal_container}>
   <>
     <div style={{ flex: 1, justifyContent: "center"}}>
       {config.language == "de" ? <p style={styles.heading}>
         <p style={{color: "#0080FF"}}>{user.username}</p> {language.remove_friend}
       </p> : <p style={styles.heading}>
       {language.remove_friend} <p style={{color: "#0080FF"}}>{user.username}</p> ?         
       </p>}
     </div>
     <div style={{ flex: 1, flexDirection: "row" }}>
       <div
         style={{
           flex: 1,
           justifyContent: "center",
           alignItems: "center",
         }}
       >
         <Button title={language.account_delete_account_cancel} onPress={() => setModalVisible(false)} color={"#484F78"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"}/>
       </div>
       <div
         style={{
           flex: 1,
           justifyContent: "center",
           alignItems: "center",
         }}
       >
         <Button title={language.friendpage_remove} onPress={() => removeFriend(user.id)} color={"#eb4034"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"}/>
       </div>
     </div>
   </>
 </div>
</div> : null;

const toggleHeader = () => {
  const div = document.getElementById("friendpage_container");
  if (div.scrollTop > 50) {
    setHeaderClass("_small")
  
  }
  else {
    setHeaderClass("")
  }
}

  return (
    <>
      {user ? (
        <>
        

      <CustomModal>
        {/* <ProfileImagePanel url={user.photoUrl} onExit={() => setShowProfilePicture(false)}/> */}
      </CustomModal>


        {/** friend map modal */}
        <CustomModal show={showMap} child={mapModalContent}/>

        {/** delete friend modal */}
        <CustomModal show={modalVisible} child={deleteFriendModalContent}/>

        { //here begins visible component
        }

        <div
          style={styles.container}
        >

        <div id="friendpage_container" onScroll={() => toggleHeader()} style={{maxWidth: 700, margin: "auto", overflow: "scroll", height: "100%"}}>

          <div style={{maxHeight: 250, position: "absolute", width: "90%", maxWidth: 700, top: 20, overflow: "hidden", borderRadius: 15, left: "50%", transform: [{translate: "-50%"}]}} className={"banner_container" + headerClass}>
            <div style={{position: "absolute", zIndex: 20, left: 15, top: 15}}>
              <BackButton onPress={() => onExit()} hoverColor={"rgba(255,255,255,0.25)"}/>
            </div>
            <div className={"profile_image_container" + headerClass}>
              <img src={chopUrl(user.photoUrl)} /* style={styles.profile_image} */ className={"profile_image" + headerClass}/>
              <div style={{width: "1rem"}}></div>
              <div style={{justifyContent: "center", alignItems: "center"}}>
                <p className={"username" + headerClass}>{!loading ? user.username : " "}</p>
              </div>
            </div>
            <img className="profile_image_huge" src={chopUrl(user.photoUrl)} style={styles.profile_image_huge}/>
          </div>
          <div>

          <div style={{flex: 1, backgroundColor: "#1E2132"}}>

            <div style={{height: 270}}></div>

          <div style={{height: "2rem"}}></div>

          {/* COUNTER */}
          <div style={{width: "90%", alignSelf: "center", margin: "auto"}}>
            <p style={styles.label}>Counter</p>
              <div style={styles.activity_container}>

                <div style={{height: "1rem"}}></div>

              {/* GESAMT */}
              {!loading ?<>
                <div>
                  <div>
                    {friendConfig.shareMainCounter ? <p style={styles.big_counter}>{user.main_counter}</p> : <p>icon{/* <MaterialIcons name="lock" style={styles.lock_icon}/> */}</p> }
                  </div>
                  <div>
                    <p style={styles.small_label}>{language.stats_all.toUpperCase()}</p>
                  </div>
                </div>

                <div style={{height: "1rem"}}></div>

                {/* DETAIL */}
                <div style={{flexDirection: "row", display: "flex"}}>
                  
                    <div style={{flex: 1, justifyContent: "center"}}>
                        <div style={{opacity: 1, transform: [{translateX: 0}]}}>
                          {friendConfig.shareTypeCounters ? <p style={styles.small_counter}>{user.joint_counter}</p> : <p>icon{/* <MaterialIcons name="lock" style={styles.lock_icon}/> */}</p>}
                        </div>
                        <p style={styles.small_label}>JOINT</p>
                        <img style={styles.small_image} src={require('../../../../../../data/img/joint.png')}/>
                    </div>

                    <div style={{flex: 1, justifyContent: "center"}}>
                     <div style={{opacity: 1, transform: [{translateX: 0}]}}>
                     {friendConfig.shareTypeCounters ? <p style={styles.small_counter}>{user.bong_counter}</p> : <p>icon{/* <MaterialIcons name="lock" style={styles.lock_icon}/> */}</p>}
                      </div>
                        <p style={styles.small_label}>BONG</p>
                        <img style={styles.small_image} src={require('../../../../../../data/img/bong.png')}/>
                    </div>

                    <div style={{flex: 1, justifyContent: "center"}}>
                      <div style={{opacity: 1, transform: [{translateX: 0}]}}>
                      {friendConfig.shareTypeCounters ? <p style={styles.small_counter}>{user.vape_counter}</p> : <p>icon{/* <MaterialIcons name="lock" style={styles.lock_icon}/> */}</p>}
                      </div>
                        <p style={styles.small_label}>VAPE</p>
                        <img style={styles.small_image} src={require('../../../../../../data/img/vape.png')}/>
                    </div>

                    <div style={{flex: 1, justifyContent: "center"}}>
                     <div style={{opacity: 1, transform: [{translateX: 0}]}}>
                      {friendConfig.shareTypeCounters ? <p style={styles.small_counter}>{user.pipe_counter}</p> : <p>icon {/* <MaterialIcons name="lock" style={styles.lock_icon}/> */}</p>}
                      </div>
                        <p style={styles.small_label}>PFEIFE</p>
                        <img style={styles.small_image} src={require('../../../../../../data/img/pipe.png')}/>
                    </div>

                    <div style={{flex: 1, justifyContent: "center"}}>
                      <div style={{opacity: 1, transform: [{translateX: 0}]}}>
                      {friendConfig.shareTypeCounters ? <p style={styles.small_counter}>{user.cookie_counter}</p> : <p>icon {/* <MaterialIcons name="lock" style={styles.lock_icon}/> */}</p>}
                      </div>
                        <p style={styles.small_label}>EDIBLE</p>
                        <img style={styles.small_image} src={require('../../../../../../data/img/cookie.png')}/>
                    </div>

                </div>
                <div style={{height: "1rem"}}></div>
                </> : <CustomLoader x={50} color={"#0080FF"}/>}
              </div>
          </div>
              
              <div style={{height: "2rem"}}></div>

              {/**LAST ACTIVITY */}
               

              <div style={{position: "relative", width: "100%", alignSelf: "center", flex: 4}}>
                <div style={{width: "90%", alignSelf: "center", backgroundColor: "green", margin: "auto"}}>
                
                <p style={styles.label}>{language.friendpage_last_activity}</p>
                {user.last_entry_latitude != null ?<>
                <div style={{ height: "1rem"}}></div>
                <div style={styles.activity_container}>
                
                {!loading ? <>
                <div style={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15, overflow: "hidden"}}>

                  <div style={{width: "100%", height: "40%", position: "absolute", zIndex: 2, top: 0, flexDirection: "row", padding: "2rem"}}>
                    {friendConfig.shareLastEntry ? <>
                    <div style={{flex: 2, alignItems: "center"}}>
                      <TypeImage type={user.last_entry_type} x={40}/>
                    </div>
                    <div style={{flex: 8, flexDirection: "column"}}>
                      <div style={{flex: 1}}>
                        <p style={styles.date}>{toGermanDate(new Date(user.last_entry_timestamp))}</p>
                      </div>
                      <div style={{flex: 1}}>
                        <p style={styles.date}>{chopTimeStamp(user.last_entry_timestamp)}</p>
                      </div>
                    </div></> : <p>icon {/* <MaterialIcons name="lock" style={styles.lock_icon}/> */}</p> }
                  </div>

                  {/* <LinearGradient style={{width: "100%", height: friendConfig.shareGPS ? "70%" : "100%", position: "absolute", zIndex: 1, top: 0, justifyContent: "center"}} colors={["rgba(0,0,0,0.9)","rgba(0,0,0,0)"]}>
                    {!friendConfig.shareGPS ? <p>icon</p> : null}
                  </LinearGradient> */}

                  {/* <MapView 
                    style={{height: 200, width: "100%", zIndex: -1}}
                    customMapStyle={mapStyle}
                    scrollEnabled={false}
                    region={friendConfig.shareGPS ? {
                      latitude: user.last_entry_latitude + 0.005,
                      longitude: user.last_entry_longitude,
                      longitudeDelta: 0.1,
                      latitudeDelta: 0.1
                    } : {
                      latitude: 50.228293,
                      longitude:  10.812738,
                      longitudeDelta: 1000,
                      latitudeDelta: 1000
                    }}
                    loadingBackgroundColor={"#1E2132"}
                  >  
                  <Marker
                    tracksViewChanges={false}
                    key={uuidv4()}
                    coordinate={{
                      latitude: user.last_entry_latitude,
                      longitude: user.last_entry_longitude,
                    }}
                  >
                      <CustomMarker
                        photoUrl={user.photoUrl}
                        type={user.last_entry_type}
                        withOutDate={true}
                      />
                  </Marker>
                  </MapView> */}
                </div>
                </> : <CustomLoader x={50} color={"#0080FF"}/>}
                </div>
                </>: <Empty title={"Nutzer hat keine letzten Einträge"}/>}
                </div>
                <div style={{height: "2rem"}}></div>
                {loading ? null : <> 
                {friendConfig.shareGPS && user.last_entry_latitude != null ? <Button title={language.show_on_map} color={"#484F78"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"} onPress={() => setShowMap(true)}/> : null}</>}
              </div>


              <div style={{height: "2rem"}}></div>


              {/**MEMBER SINCE */}

              <div style={{width: "90%", alignSelf: "center", margin: "auto"}}>
                <p style={styles.label}>{language.account_member_since}</p>
                <MemberSince timestamp={user.member_since} backgroundColor={"#131520"}/>
                
              </div>

              {/**FREUND ENTFERNEN */}

              {/* <div style={{height: "2rem"}}></div>

              <div style={{position: "relative", width: "100%", flex: 1, marginBottom: 20}}>
                <div onClick={() => setModalVisible(true)}>
                  <div style={styles.touchable_delete}>
                    <p style={styles.delete_text}>{language.friendpage_remove_friend}</p>
                  </div>
                </div>
              </div> */}

              <div style={{height: 100}}></div>
          </div>
          </div> 
        </div>
        </div>
        
        </>) : null}
    </>
  );
};

export default FriendPage;

const styles = {
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#1E2132",
    overflow: "hidden"
  },
  label: {
    color: "white",
    fontSize: "1rem",
    fontFamily: "Poppins",
    textAlignVertical: "center",
    textAlign: "left"
  },
  date: {
    color: "white",
    fontSize: "1rem",
    fontFamily: "Poppins",
    textAlignVertical: "center",
    textAlign: "left",
  },
  touchable_delete: {
    width: "100%",
    alignSelf: "center",
    height: 60,
    borderRadius: 100,
  },
  delete_text: {
    color: "#eb4034",
    fontFamily: "PoppinsLight",
    alignSelf: "center",
    textAlignVertical: "center",
    height: "100%",
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
    textAlign: "center",
    fontFamily: "PoppinsBlack",
    fontSize: 22,
    maxWidth: 300,
    alignSelf: "center",
  },
  activity_container: {
    backgroundColor: "#131520",
    borderRadius: 15,
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex"
  },
  small_counter: {
    zIndex: 2,
    color: "white",
    fontSize: "1rem",
    fontFamily: "Poppins",
    fontWeight: 700,
    textAlign: "center",
    opacity: 1,
    margin: 0
  },
  big_counter: {
    zIndex: 2,
    color: "white",
    fontSize: "2rem",
    fontFamily: "Poppins",
    textAlign: "center",
    opacity: 1,
    margin: 0,
    fontWeight: 700
  },
  small_image: {
      height: "8rem",
      width: "2rem",
      position: "absolute",
      zIndex: -1,
      opacity: 0.2,
      alignSelf: "center"
  },
  small_label: {
    textAlign: "center",
    zIndex: 1,
    color: "rgba(255,255,255,1)",
    fontFamily: "Poppins",
    fontSize: "0.75rem",
    margin: 0
  },
  lock_icon: {
    color: "white",
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: 10
  },
  map: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#171717",
  },
  profile_image_huge: {
    display: "block",
    width: "100%",
    height: "auto",
    borderRadius: 15,
    zIndex: 3,
    borderRadius: 15,
  }
};
