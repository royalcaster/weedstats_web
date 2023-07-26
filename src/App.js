import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  BrowserRouter,
  Routes
} from "react-router-dom";

//Custom components
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import { useEffect, useState } from 'react';

//Data
import Languages from './data/languages.json'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser } from '@firebase/auth'
import { app, firestore } from './data/FirebaseConfig'
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "@firebase/firestore";
import { createUsernameArray, downloadUser } from "./data/Service";

const App = () => {

  //States für Daten
  const [config, setConfig] = useState(null);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState(Languages.en);
  const [friendList, setFriendList] = useState([]);

  //States für Frontend
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  //Authentifizierung
  const auth = getAuth(app);

  useEffect(() => {
    checkForUser();

    //------------- Hier Notifications registrieren



  },[]);

  useEffect(() => {
    if (user != null) {
      getFriendList();
    }
  },[user]);

  useEffect(() => {
    if (config != null) {
      config.language == "de" ? setLanguage(Languages.de) : setLanguage(Languages.en);
    }
  },[config]);

  //Sucht im AsyncStorage nach dem letzten User der sich eingeloggt hat und loggt sich bei Erfolg automatisch ein
  const checkForUser = async () => {
    try {
      const accessToken = JSON.parse(await localStorage.getItem("accessToken"));
      if (accessToken != null) {
        handleLogin(accessToken.email, accessToken.password);
      }
      else {
        setLoading(false);
      }
    }
    catch (error) {
      console.log("Fehler beim Laden des angemeldeten Nutzers:" + error)
    }
  }

  //behandelt Login-Event NEU 
  const handleLogin = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
      const result = userCredential.user;
      await localStorage.setItem("accessToken", JSON.stringify({
        email: email,
        password: password
      }));
      const docSnap = await getDoc(doc(firestore, "users", result.uid));
      if (docSnap.exists()) {
        setUser({
          username: docSnap.data().username,
          id: docSnap.data().id,
          email: docSnap.data().email,
          photoUrl: docSnap.data().photoUrl,
          friends: docSnap.data().friends,
          requests: docSnap.data().requests,
          joint_counter: docSnap.data().joint_counter,
          bong_counter: docSnap.data().bong_counter,
          vape_counter: docSnap.data().vape_counter,
          pipe_counter: docSnap.data().pipe_counter,
          cookie_counter: docSnap.data().cookie_counter,
          member_since: docSnap.data().member_since,
          last_entry_timestamp: docSnap.data().last_entry_timestamp,
          last_entry_latitude: docSnap.data().last_entry_latitude,
          last_entry_longitude: docSnap.data().last_entry_longitude,
          last_entry_type: docSnap.data().last_entry_type,
          main_counter: docSnap.data().main_counter,
          username_array: docSnap.data().username_array,
          news_read: docSnap.data().news_read,
          app_version: docSnap.data().app_version
        });
        setConfig({
          first: docSnap.data().config.first,
          language: docSnap.data().config.language,
          localAuthenticationRequired: docSnap.data().config.localAuthenticationRequired,
          saveGPS: docSnap.data().config.saveGPS,
          shareGPS: docSnap.data().config.shareGPS,
          shareLastEntry: docSnap.data().config.shareLastEntry,
          shareMainCounter: docSnap.data().config.shareMainCounter,
          shareTypeCounters: docSnap.data().config.shareTypeCounters,
          showBong: docSnap.data().config.showBong,
          showCookie: docSnap.data().config.showCookie,
          showJoint: docSnap.data().config.showJoint,
          showPipe: docSnap.data().config.showPipe, 
          showVape: docSnap.data().config.showVape
        });
      }
      setWrongPassword(false);
      setLoading(false);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Fehler beim Anmelden per Email: " + errorMessage);
      if (errorCode == "auth/wrong-password") {
        setWrongPassword(true);
        setUser(null);
        setLoading(false);
      }
      else {
        setWrongPassword(false);
      }

      if (errorCode == "auth/user-not-found") {
        setUserNotFound(true);
        setUser(null);
        setLoading(false);
      }
      else {
        setUserNotFound(false);
      }
    });
  }
  
  //Lädt Freundesliste des angemeldeten Nutzers herunter
  const getFriendList = async () => {
    const docSnap = await getDoc(doc(firestore, "users", user.id));
    var friends;
    try {
      if (docSnap.exists()) {
        friends = docSnap.data().friends;
        var buffer = [];
        setFriendList([]);
        if (user != null) {
          friends.forEach(async (friend) => {
            let data = await downloadUser(friend);
            setFriendList(oldFriendList => [...oldFriendList, data]);
          });
        }
      }
    }
    catch(e){
      console.log("Check getFriendList (App.js): " + e);
    }
  }

  const refreshUser = async ( settings ) => {
    await updateDoc(doc(firestore, "users", user.id), settings);

    setUser({
      username: settings.username ? settings.username : user.username,
      id: settings.id ? settings.id : user.id,
      email: settings.email ? settings.email : user.email,
      photoUrl: settings.photoUrl ? settings.photoUrl : user.photoUrl,
      friends: settings.friends ? settings.friends : user.friends,
      requests: settings.requests ? settings.requests : user.requests,
      joint_counter: settings.joint_counter ? settings.joint_counter : user.joint_counter,
      bong_counter: settings.bong_counter ? settings.bong_counter : user.bong_counter,
      vape_counter: settings.vape_counter ? settings.vape_counter : user.vape_counter,
      pipe_counter: settings.pipe_counter ? settings.pipe_counter : user.pipe_counter,
      cookie_counter: settings.cookie_counter ? settings.cookie_counter : user.cookie_counter,
      member_since: settings.member_since ? settings.member_since : user.member_since,
      last_entry_timestamp: settings.last_entry_timestamp ? settings.last_entry_timestamp : user.last_entry_timestamp,
      last_entry_latitude: settings.last_entry_latitude ? settings.last_entry_latitude : user.last_entry_latitude,
      last_entry_longitude: settings.last_entry_longitude ? settings.last_entry_longitude : user.last_entry_longitude,
      last_entry_type: settings.last_entry_type ? settings.last_entry_type : user.last_entry_type,
      main_counter: settings.main_counter ? settings.main_counter : user.main_counter,
      username_array: settings.username ? createUsernameArray(settings.username.toUpperCase()) : user.username_array,
      news_read: settings.news_read ? settings.news_read : user.news_read,
      app_version: settings.app_version ? settings.app_version : user.app_version
    });

    if (settings.config) {
      setConfig({
        first: settings.config.first != null ? settings.config.first : config.first,
        language: settings.config.language != null ? settings.config.language : config.language,
        localAuthenticationRequired: settings.config.localAuthenticationRequired != null ? settings.config.localAuthenticationRequired : config.localAuthenticationRequired,
        saveGPS: settings.config.saveGPS != null ? settings.config.saveGPS : config.saveGPS,
        shareGPS: settings.config.shareGPS != null ? settings.config.shareGPS : config.shareGPS,
        shareLastEntry: settings.config.shareLastEntry != null ? settings.config.shareLastEntry : config.shareLastEntry,
        shareMainCounter: settings.config.shareMainCounter != null ? settings.config.shareMainCounter : config.shareMainCounter,
        shareTypeCounters: settings.config.shareTypeCounters != null ? settings.config.shareTypeCounters : config.shareTypeCounters,
        showBong: settings.config.showBong != null ? settings.config.showBong : config.showBong,
        showCookie: settings.config.showCookie != null ? settings.config.showCookie : config.showCookie,
        showJoint: settings.config.showJoint != null ? settings.config.showJoint : config.showJoint,
        showPipe: settings.config.showPipe != null ? settings.config.showPipe : config.showPipe, 
        showVape: settings.config.showVape != null ? settings.config.showVape : config.showVape
      });
    }
    
  }

  //Holt Einstellungen aus dem AsyncStorage
  const loadSettings = async () => {
    setLoading(true);
    try {
      let docSnap = await getDoc(doc(firestore, "users", user.id));
      if (docSnap.exists()) {
        setConfig({
          "first": docSnap.data().config.first,
          "language": docSnap.data().config.language,
          "localAuthenticationRequired": docSnap.data().config.localAuthenticationRequired,
          "saveGPS": docSnap.data().config.saveGPS,
          "shareGPS": docSnap.data().config.shareGPS,
          "shareLastEntry": docSnap.data().config.shareLastEntry,
          "shareMainCounter": docSnap.data().config.shareMainCounter,
          "shareTypeCounters": docSnap.data().config.shareTypeCounters,
          "showBong": docSnap.data().config.showBong,
          "showCookie": docSnap.data().config.showCookie,
          "showJoint": docSnap.data().config.showJoint,
          "showPipe": docSnap.data().config.showPipe,
          "showVape": docSnap.data().config.showVape,
        });
        /* setLocalAuthenticationRequired(docSnap.data().config.localAuthenticationRequired);
        console.log(docSnap.data().config.localAuthenticationRequired); */
      }
      setLoading(false);
    } catch (e) {
      console.log("Error in Config beim Laden: ", e);
    }
    setLoading(false);
  };

  //Behandelt Konto-Erstellung
  const handleCreate = (username, email, password) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const result = userCredential.user;
      await localStorage.setItem("accessToken", JSON.stringify({
        email: email,
        password: password,
        localAuthenticationRequired: false
      }));
      await setDoc(doc(firestore, "users", result.uid), {
        username: username,
        id: result.uid,
        email: email,
        photoUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        friends: [],
        requests: [],
        joint_counter: 0,
        bong_counter: 0,
        pipe_counter: 0,
        vape_counter: 0,
        cookie_counter: 0,
        member_since: Date.now(),
        last_entry_timestamp: null,
        last_entry_latitude: null,
        last_entry_longitude: null,
        last_entry_type: null,
        main_counter: 0,
        username_array: createUsernameArray(username.toUpperCase()),
        app_version: "0.0.1",
        news_read: false,
        config: {
          first: true,
          language: "en",
          localAuthenticationRequired: false,
          saveGPS: true,
          shareGPS: false,
          shareLastEntry: false,
          shareMainCounter: false,
          shareTypeCounters: false,
          showBong: true,
          showCookie: true,
          showJoint: true,
          showPipe: true, 
          showVape: true
        }
      });

      const docSnap = await getDoc(doc(firestore, "users", result.uid));
      if (docSnap.exists()) {
        setUser({
          username: docSnap.data().username,
          id: docSnap.data().id,
          email: docSnap.data().email,
          photoUrl: docSnap.data().photoUrl,
          friends: docSnap.data().friends,
          requests: docSnap.data().requests,
          joint_counter: docSnap.data().joint_counter,
          bong_counter: docSnap.data().bong_counter,
          vape_counter: docSnap.data().vape_counter,
          pipe_counter: docSnap.data().pipe_counter,
          cookie_counter: docSnap.data().cookie_counter,
          member_since: docSnap.data().member_since,
          last_entry_timestamp: docSnap.data().last_entry_timestamp,
          last_entry_latitude: docSnap.data().last_entry_latitude,
          last_entry_longitude: docSnap.data().last_entry_longitude,
          last_entry_type: docSnap.data().last_entry_type,
          main_counter: docSnap.data().main_counter,
          username_array: docSnap.data().username_array,
          app_version: docSnap.data().app_version,
          news_read: docSnap.data().news_read
        });
        setConfig({
          first: docSnap.data().config.first,
          language: docSnap.data().config.language,
          localAuthenticationRequired: docSnap.data().config.localAuthenticationRequired,
          saveGPS: docSnap.data().config.saveGPS,
          shareGPS: docSnap.data().config.shareGPS,
          shareLastEntry: docSnap.data().config.shareLastEntry,
          shareMainCounter: docSnap.data().config.shareMainCounter,
          shareTypeCounters: docSnap.data().config.shareTypeCounters,
          showBong: docSnap.data().config.showBong,
          showCookie: docSnap.data().config.showCookie,
          showJoint: docSnap.data().config.showJoint,
          showPipe: docSnap.data().config.showPipe, 
          showVape: docSnap.data().config.showVape
        });
      }
      setLoading(false);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Fehler beim erstellen des Kontos: " + errorMessage);

      if (errorCode == "auth/email-already-in-use") {
        setEmailInUse(true);
        setLoading(false);
      }
    });
  }

  return (
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  );
}

export default App;
