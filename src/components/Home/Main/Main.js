//React
import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../../../data/UserContext";

//Custom Components
import CounterItem from "./CounterItem/CounterItem";
import Tutorial from '../../common/Tutorial';
import CustomLoader from "../../common/CustomLoader";
import Empty from "../../common/Empty";
import CustomModal from "../../common/CustomModal";
import Button from "../../common/Button";
import Donation from './Donation/Donation'
import Levels from './Levels/Levels'
import AppInfo from './AppInfo/AppInfo'

//Third Party
import moment from "moment";
import { compare, compareVersions } from 'compare-versions';

//Service
import sayings from '../../../data/Sayings.json'
import { LanguageContext } from "../../../data/LanguageContext";
import { ConfigContext } from '../../../data/ConfigContext'
import { doc, updateDoc, getDoc } from "@firebase/firestore";
import { app, firestore } from "../../../data/FirebaseConfig";
import CounterModal from "../../common/CounterModal";
import { FriendListContext } from "../../../data/FriendListContext";
import { getCounterNotificationTitle } from "../../../data/Service";
import NewsPanel from "../../common/NewsPanel";
import News from "../../../data/News";
import UpdatePanel from "../../common/UpdatePanel";
import package_object from '../../../../package.json'
import { useGeolocated } from "react-geolocated";

//navigation
import { useNavigate } from "react-router-dom";
import { FaTrophy, FaMoneyBillWave } from "react-icons/fa";
import { BiSolidHelpCircle } from 'react-icons/bi'
import { AiFillInfoCircle } from 'react-icons/ai'
import { Routes, Route } from "react-router-dom";

const Main = ({ sendPushNotification, toggleNavbar, refreshUser }) => {

  //Geolocation
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
  });

  //Context
  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  const config = useContext(ConfigContext);
  const friendList = useContext(FriendListContext);

  //Navigation
  const navigate = useNavigate();
  
  //Refs
  /* const headingAnim = useRef(new Animated.Value(-100)).current;
  const leftAnim = useRef(new Animated.Value(-70)).current;
  const rightAnim = useRef(new Animated.Value(70)).current; */

  //States
  const [borderColor, setBorderColor] = useState("#1E2132");
  const [loading, setLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [countdown, setCountDown] = useState(0);
  const [counterOrder, setCounterOrder] = useState([
    { type: "joint", counter: user.joint_counter },
    { type: "bong", counter: user.bong_counter },
    { type: "vape", counter: user.vape_counter },
    { type: "pipe", counter: user.pipe_counter },
    { type: "cookie", counter: user.cookie_counter },
  ]);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [sayingNr, setSayingNr] = useState(0);
  const [writeComplete, setWriteComplete] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [showAppInfo, setShowAppInfo] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showUpdatePanel, setShowUpdatePanel] = useState(false)
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

 /*  useEffect(() => {
    !showCounterModal ? toggleBorderColor("rgba(0,0,0,0)", "#484F78") : null;
  },[showCounterModal]); */

  useEffect(() => {
    /* Animated.timing(headingAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
    }).start();

    Animated.timing(leftAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
    }).start();

    Animated.timing(rightAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
    }).start(); */

    checkForUpdate();
    checkForNews();
    calcDaysTill420();
    sortCounterOrder();
  }, []);

  const checkForNews = async () => {
    const app_version = package_object.version;
    const newsSnap = await getDoc(doc(firestore, "news", app_version));

    if (compareVersions(app_version, user.app_version) == 1) {
      //Nutzer hat update gemacht
      //installierte Version ist größer als Datenbank-version -> datenbank version erhöhen und news_read auf false setzen
      refreshUser({
        app_version: app_version,
        news_read: false
      });
      setShowNews(true)
    }
  }

  
  const checkForUpdate = async () => {
    const docSnap = await getDoc(doc(firestore, "info", "info"))
    console.log("checkForUpdate Alert wieder anschalten");
    if (docSnap.exists()) {
      if (compareVersions(docSnap.data().latest_version, package_object.version) == 1) {
        /* alert('Update available', 'This version of the app is no longer supported, please update the app from the Google PlayStore to ensure a seamless experience.', [
          {
            text: 'Later',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Go to PlayStore', onPress: () => console.log("Link in Main.js definieren!")},
        ]); */
      }
    }
  }

  const sortCounterOrder = () => {

    let settings = [];
    if (config.showJoint == false) {
      settings.push("joint")
    }
    if (config.showBong == false) {
      settings.push("bong")
    }
    if (config.showVape == false) {
      settings.push("vape")
    }
    if (config.showPipe == false) {
      settings.push("pipe")
    }
    if (config.showCookie == false) {
      settings.push("cookie")
    }

    let buffer = counterOrder.filter((item) => !settings.includes(item.type));
    setCounterOrder(buffer);
    setShowTutorial(config.showTutorial);
      
    counterOrder.sort((a, b) => {
      return b.counter - a.counter;
    });
    setLoading(false);
  };

  const calcDaysTill420 = () => {
    let target = "";
    let now = new Date();
    let ft_current_year = new Date(now.getFullYear(), 3, 20, 0, 0);

    if (now.getTime() < ft_current_year.getTime()) {
      let a = moment(now);
      let b = moment(ft_current_year);
      target = b.diff(a, "days");
    } else {
      let ft_next_year = new Date(
        ft_current_year.setFullYear(ft_current_year.getFullYear() + 1)
      );
      let a = moment(now);
      let b = moment(ft_next_year);
      target = b.diff(a, "days");
    }
    setCountDown(target);
  };

  const tutorialSeen = async () => {
    try {
      const jsonValue = JSON.stringify(config);
      await localStorage.setItem("settings", jsonValue);
    } catch (e) {
      console.log("Error in Config beim Speichern: ", e);
    }
    setLoading(false);
  };


  const onDone = () => {
    setShowTutorial(false);
    tutorialSeen();
  }

  const toggleBorderColor = ( color, color2 ) => {
    setBorderColor(color);
  }

  //erhöht den Counter für den jeweiligen Typ unter Berücksichtigung der momentanen Config
  //hier ist viel auskommentiert, weil das berücksichtigen der Einstellungen eigentlich fast nur nur in der Freunde ansicht passiert. (Was wird angezeigt und was nicht)
  const toggleCounter = async (index, color) => {
    sendCounterPushNotification(index);
    setBorderColor(color);
    let new_entry = {
      number: user.main_counter + 1,
      type: index,
      timestamp: Date.now(),
      latitude: null,
      longitude: null,
    };

    // Neuen Index für Zitat ermitteln
    setSayingNr(Math.floor(Math.random() * sayings.length));

    setShowCounterModal(true);

    if (config.saveGPS) {
      // Die Bestimmung der Position dauert von den Schritten in der Funktion toggleCounter() mit Abstand am längsten
      /* let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      } */
      /* let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      }); */

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }

      function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    
        // Make API call to OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<YOUR_API_KEY>&units=metric`)
          .then(response => response.json())
          .then(data => {
            setWeather(data);
            console.log(data);
          })
          .catch(error => console.log(error));
      }
    
      function error() {
        console.log("Unable to retrieve your location");
      }

      if (location != null) {
        new_entry.latitude = location.coords.latitude;
        new_entry.longitude = location.coords.longitude;
      }
    }

    await writeLocalStorage(new_entry);

    const docRef = doc(firestore, "users", user.id);
    const docSnap = await getDoc(docRef);

    await refreshUser({
      [index + "_counter"]: docSnap.data()[index + "_counter"] + 1,
      last_entry_latitude: new_entry.latitude,
      last_entry_longitude: new_entry.longitude,
      last_entry_timestamp: new_entry.timestamp,
      last_entry_type: new_entry.type,
      main_counter: docSnap.data().joint_counter + docSnap.data().bong_counter + docSnap.data().vape_counter + docSnap.data().pipe_counter + docSnap.data().cookie_counter + 1,
    });
    setWriteComplete(true);
    /* await updateDoc(docRef, {
      [index + "_counter"]: docSnap.data()[index + "_counter"] + 1,
      last_entry_latitude: new_entry.latitude,
      last_entry_longitude: new_entry.longitude,
      last_entry_timestamp: new_entry.timestamp,
      last_entry_type: new_entry.type,
      main_counter: docSnap.data().joint_counter + docSnap.data().bong_counter + docSnap.data().vape_counter + docSnap.data().pipe_counter + docSnap.data().cookie_counter + 1,
    });

    const docSnap_new = await getDoc(docRef);
    onSetUser({
      ...user,
      main_counter: docSnap_new.data().main_counter,
      joint_counter: docSnap_new.data().joint_counter, 
      bong_counter: docSnap_new.data().bong_counter,
      vape_counter: docSnap_new.data().vape_counter,
      pipe_counter: docSnap_new.data().pipe_counter,
      cookie_counter: docSnap_new.data().cookie_counter,
      last_entry_timestamp: docSnap_new.data().last_entry_timestamp,
      last_entry_type: docSnap_new.data().last_entry_type,
      last_entry_latitude: docSnap_new.data().last_entry_latitude,
      last_entry_longitude: docSnap_new.data().last_entry_longitude,
    });
    setWriteComplete(true); */
  };

  //erstellt Einträge im lokalen Gerätespeicher
  const writeLocalStorage = async (new_entry) => {
    // Erstellt neuen Eintrag im AsyncStorage
    try {
      const jsonValue = JSON.stringify(new_entry);
      await localStorage.setItem(
        user.id + "_entry_" + (user.main_counter + 1),
        jsonValue
      );
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const sendCounterPushNotification = ( type ) => {
    friendList.forEach((friend) => {
      var title = getCounterNotificationTitle(type, user.username, friend.config.language);
      var body = friend.config.language == "de" ? "Schau's dir jetzt an!" : "Check it out now!"
      var data = {
        notification_type: "counter",
        friend_id: user.id
      }
      /* sendPushNotification(friend.expo_push_token, title, body, data); */
    });
  }

  const CounterModalContent = <CounterModal borderColor={borderColor} sayingNr={sayingNr} loadingColor={borderColor} onExit={() => setShowCounterModal(false)} writeComplete={writeComplete}/> 

  const button_icon_style = {fontSize: "1rem", color: "white"}

  return (
    <>

        {showNews ? <NewsPanel language={language} onExit={() => setShowNews(false)} refreshUser={refreshUser} /> : null}
        {showUpdatePanel ? <UpdatePanel language={language} onExit={() => setShowUpdatePanel(false)}/> : null}

        <CustomModal show={showCounterModal} child={CounterModalContent}/>

        <Routes>
        <Route index path='/' element={<>
        {showTutorial ? 
        <div style={{zIndex: 3000, position: "absolute", height: "100%", width: "100%"}}>
          <Tutorial onDone={onDone} extraHeight={50}/>
        </div> : <> 
          <div style={{height: "100%", width: "100%", maxWidth: 700, alignSelf: "center"}}>
          {loading ? (
            <div
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomLoader x={50} color={"#484F78"}/>
            </div>
          ) : (
            <>
              {counterOrder.length == 0 ? (
                <div style={{height: "90%", justifyContent: "center"}}>
                  <Empty title={"Keine Counter aktiviert"} tip={"Konfiguriere deine Ansicht in den Einstellungen."}/>
                </div>
              ) : <div style={styles.counters_container}> 
            <div style={{ display: "flex", width: "100%", flexDirection: "row"}}>
            <div
              style={{
                paddingLeft: 15,
                flex: 1,
              }}
            >
              <p
                style={{
                  margin: 0,
                  marginTop: 10,
                  color: "#737EBF",
                  fontFamily: "Poppins",
                  marginBottom: -10,
                  fontSize: 12,
                }}
              >
                {language.main_all}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  fontSize: 25,
                  color: "#737EBF",
                }}
              >
                {user.main_counter}
              </p>
            </div>
            <div>
              <div style={{height: "1rem"}}></div>
              <p style={styles.main_heading}>{language.short == "de" ? "Hallo" : "Hello"}</p>
              <p style={{fontSize: "1.25rem", fontFamily: "Poppins", textAlign: "center", color: "white", fontWeight: 700, margin: 0}}>{user.username}</p>
            </div>
            <div
              style={{
                paddingRight: 15,
                flex: 1
              }}
            >
              <p
                style={{
                  margin: 0,
                  marginTop: 10,
                  textAlign: "right",
                  color: "#737EBF",
                  fontFamily: "Poppins",
                  marginBottom: -10,
                  fontSize: 12,
                }}
              >
                {language.main_days_till_420}
              </p>
              <p
                style={{
                  margin: 0,
                  textAlign: "right",
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  fontSize: 25,
                  color: "#737EBF",
                }}
              >
                {countdown}
              </p>
            </div>
          </div>

                {counterOrder.map((item) => {
                  return (
                    <CounterItem
                      key={item.type}
                      type={item.type}
                      counter={user[item.type + "_counter"]}
                      toggleCounter={toggleCounter}
                      toggleBorderColor={toggleBorderColor}
                    />
                  );
                })}
                
                <div style={{height: "1rem"}}></div>

                <div style={{display: "flex", flex: 4, justifyContent: "center", flexDirection: "column"}}>
                <div style={{ display: "flex", flexDirection: "row", width: "90%", alignSelf: "center", justifyContent: "center"}}>
                    <div style={{flex: 1, justifyContent: "center", display: "flex"}}>
                      <Button
                        fontColor={"white"}
                        onPress={() => navigate('/home/counter/levels')}
                        borderradius={10}
                        color={"#131520"}
                        title={" " + language.account_levels}
                        icon={<FaTrophy style={button_icon_style}/>}
                        hovercolor={"rgba(255,255,255,0.15)"}
                        small={true} 
                      />
                    </div>
                    <div style={{flex: 1, justifyContent: "center", display: "flex"}}>
                      <Button
                        onPress={() => navigate('/home/counter/app-info')}
                        title={" App-Info"}
                        icon={<AiFillInfoCircle style={button_icon_style}/>}
                        borderradius={10}
                        color={"#131520"}
                        fontColor={"white"}
                        hovercolor={"rgba(255,255,255,0.15)"}
                        small={true} 
                      />
                    </div>
                </div>
                <div style={{height: "0.5rem"}}></div>
                <div style={{display: "flex", flexDirection: "row", width: "90%", alignSelf: "center"}}>
                    <div style={{flex: 1, justifyContent: "center", display: "flex"}}>
                      <Button
                        onPress={() => navigate('/home/counter/tutorial')}
                        title={" " + language.account_tutorial}
                        icon={<BiSolidHelpCircle style={button_icon_style}/>}
                        borderradius={10}
                        color={"#131520"}
                        fontColor={"white"}
                        hovercolor={"rgba(255,255,255,0.15)"}
                        small={true}
                      />
                    </div>
                    <div style={{flex: 1, justifyContent: "center", display: "flex"}}>
                    <Button
                        onPress={() => navigate('/home/counter/premium')}
                        title={" " + language.account_support}
                        icon={<FaMoneyBillWave style={button_icon_style}/>}
                        borderradius={10}
                        color={"#131520"}
                        fontColor={"white"}
                        hovercolor={"rgba(255,255,255,0.15)"}
                        small={true}
                        color2={"#F2338C"}
                      />
                    </div>
                    
                </div>
                <div style={{height: "2rem"}}></div>
                </div>
              </div>}
            </>
          )}
          </div>
          </>}</>}/>

          <Route exact path='levels' element={<Levels onExit={() => navigate('/home/counter')}/>}/>
          <Route exact path='app-info' element={<AppInfo onExit={() => navigate('/home/counter')}/>}/>
          <Route exact path='premium' element={<Donation onExit={() => navigate('/home/counter')}/>}/>
          <Route exact path='tutorial' element={<Tutorial onExit={() => navigate('/home/counter')}/>}/>

          </Routes>
    </>
  );
};

export default Main;

const styles = {
  counters_container: {
    flex: 5,
    backgroundColor: "#1E2132",
    width: "100%",
  },
  main_heading: {
    color: "white",
    fontSize: "1rem",
    fontFamily: "Poppins",
    position: "relative",
    textAlign: "center",
    margin: 0
  },
  money_icon: {
    fontSize: 25,
    color: "white",
    textAlignVertical: "center",
  },
};
