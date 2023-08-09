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
import { useNavigate } from 'react-router-dom';

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
import package_object from '../package.json'
import { ref, deleteObject } from '@firebase/storage'
import { storage } from "./data/FirebaseConfig";
import { LanguageContext } from './data/LanguageContext';
import { UserContext } from './data/UserContext';
import { ConfigContext } from './data/ConfigContext';
import { FriendListContext } from './data/FriendListContext';

//Third Party
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

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

  //Navigation
  const navigate = useNavigate();

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
        navigate('/login');
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
      navigate("/home")
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
        app_version: package_object.version,
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

  //behandlet Beendigung des Intros, Reihenfolge der Ausführungen ist wichtig, sonst endlosschleife im Intro
  const handleIntroFinish = async (introConfig) => {
    handleAuthenticatorSelect(introConfig.enableAuthentication);
    toggleLanguage(introConfig.language);
    updateDoc(doc(firestore, "users", user.id), {
      config: {
        first: false,
        language: config.language,
        localAuthenticationRequired: config.localAuthenticationRequired,
        saveGPS: config.saveGPS,
        shareGPS: config.shareGPS,
        shareLastEntry: config.shareLastEntry,
        shareMainCounter: config.shareMainCounter,
        shareTypeCounters: config.shareTypeCounters,
        showBong: config.showBong,
        showCookie: config.showCookie,
        showJoint: config.showJoint,
        showPipe: config.showPipe, 
        showVape: config.showVape
      }
    }).then(() => {
      loadSettings();
    });
  }

  //behandelt Auswahl des Nutzers, ob lokale Authentifizierung benutzt werden soll
  const handleAuthenticatorSelect = async ( bool ) => {
    const accessToken = JSON.parse(await localStorage.getItem("accessToken"));
    await localStorage.setItem("accessToken", JSON.stringify({
        email: accessToken.email,
        password: accessToken.password,
        localAuthenticationRequired: bool
      }));
    updateDoc(doc(firestore, "users", user.id),{
      config: {
        localAuthenticationRequired: bool,

        first: false,
        language: config.language,
        saveGPS: config.saveGPS,
        shareGPS: config.shareGPS,
        shareLastEntry: config.shareLastEntry,
        shareMainCounter: config.shareMainCounter,
        shareTypeCounters: config.shareTypeCounters,
        showBong: config.showBong,
        showCookie: config.showCookie,
        showJoint: config.showJoint,
        showPipe: config.showPipe, 
        showVape: config.showVape
      }
    });
  }

  //behandelt LogOut-Event
  const handleLogOut = async () => {
    setLoading(true);
    localStorage.removeItem("accessToken");
    signOut(auth).then(() => {
      setUser(null);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  };

  //behandelt das Löschen des Nutzeraccounts
  const deleteAccount = async () => {
    setLoading(true);

    if (user.photoUrl != "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png") {
      //Delete Old Profile Picture
      const fileRef = ref(storage, "profile-pictures/" + user.id + ".png");
      // Delete the file
      deleteObject(fileRef).then(() => {
      }).catch((error) => {
        console.log("Error beim Löschen des alten Profilbilds:" + error);
      });
    }

    const current_user = auth.currentUser;
    deleteUser(current_user).then(() => {
      localStorage.removeItem("user_id");
    }).catch((error) => {
      // An error ocurred
      console.log("Fehler beim löschen des Kontos: " + error);
    });

    // Firestore-Doc löschen
    const docRef = doc(firestore, "users", user.id);
    await deleteDoc(docRef);
    setLoading(false);
    handleLogOut();
  };

  //stellt Sprache um, die im Context geteilt wird
  const toggleLanguage = async ( lang ) => {
    if (lang == "de" && config.language == "en") {
      setLanguage(Languages.de);
      /* await AsyncStorage.setItem("settings",JSON.stringify({...config, language: "de"})); */
      await updateDoc(doc(firestore, "users", user.id),{
        config: {
          language: "de"
        }
      });
      setConfig({...config, language: "de"});
    }
    if (lang == "en" && config.language == "de") {
      setLanguage(Languages.en);
      /* await AsyncStorage.setItem("settings",JSON.stringify({...config, language: "en"})); */
      await updateDoc(doc(firestore, "users", user.id),{
        config: {
          language: "en"
        }
      });
      setConfig({...config, language: "en"});
      
    } 
  }

  const LoginComponent = <Login handleLogin={handleLogin} handleCreate={handleCreate} wrongPassword={wrongPassword} emailInUse={emailInUse} userNotFound={userNotFound}/>;

  return (
  <div style={{backgroundColor: "#1E2132", height: "100vh", width: "100vw", display: "flex", justifyContent: "center"}}>
    {!loading ? 
    <LanguageContext.Provider value={language}>
      <Routes>
        <Route path="/" element={LoginComponent}/>
        <Route path="/login" element={LoginComponent}/>
        <Route path="/home/*" element={
          <UserContext.Provider value={user}>
          <ConfigContext.Provider value={config}>
          <FriendListContext.Provider value={friendList}>
            <Home 
            loadingParent={loading}
            friendList={friendList}
            handleLogOut={handleLogOut}
            toggleLanguage={toggleLanguage}
            deleteAccount={deleteAccount}
            getFriendList={getFriendList}
            loadSettings={loadSettings}
            refreshUser={refreshUser}
            handleIntroFinish={handleIntroFinish}
            handleAuthenticatorSelect={handleAuthenticatorSelect}
            onSetUser={(user) => setUser(user)}
            />
          </FriendListContext.Provider>
          </ConfigContext.Provider>
          </UserContext.Provider>} />
      </Routes>
    </LanguageContext.Provider>
    : 
    <div style={{height: "100%", justifyContent: "center", display: "flex", alignItems: "center"}}>
      <Spinner color='#484F78' size={40}/>
    </div>}
  </div>
  );
}

export default App;
