//React
import { useContext, useState, useRef, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  BrowserRouter,
  Routes
} from "react-router-dom";
import { useNavigation } from "react-router-dom";

//Data
import { LanguageContext } from "../../data/LanguageContext";
import CreatePanel from './CreatePanel/CreatePanel'
import logo from '../../data/img/logo.png'

//Custom Components
import Button from "../common/Button";

//CSS
import './Login.css'

const Login = ({ handleLogin, handleCreate, wrongPassword, emailInUse, userNotFound }) => {

  //navigation
  const navigation = useNavigation(LanguageContext);

  //Conp
  const language = useContext(LanguageContext);

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  //Ref
  const passwordInput = useRef().current;

  useEffect(() => {
    if (emailInUse) {
      setShowCreatePanel(true);
    }
  }, []);

    const checkForSpace = () => {
      let email_without_space;
      if (email.slice(-1) === " ") {
          email_without_space = email.substring(0, email.length-1);
          setEmail(email_without_space)
      }
    }

  return (
    
    <div className="login_container">

      {showCreatePanel ? <CreatePanel onExit={() => setShowCreatePanel(false)} handleCreate={handleCreate} emailInUse={emailInUse}/> : null}

      <div
        style={{
          flex: 3,
          zIndex: 2,
          justifyContent: "center"
        }}
      >
        
        <img
          style={{ height: 100, width: 100, alignSelf: "center"}}
          src={logo}
          alt="WeedStats Logo"
        />
        <p
          style={{
            color: "white",
            fontSize: "3rem",
            fontFamily: "PoppinsBlack",
            pAlign: "center",
            marginTop: 0,
          }}
        >
          WeedStats
        </p>
      </div>

      <div style={{ zIndex: 2, flex: 5, justifyContent: "center"}}>
        <p className="label">E-Mail Adress</p>
        <input onBlur={() => checkForSpace()} type="email" className="textinput email_input" value={email} onChange={(e) => setEmail(e.target.value)}/>
        {userNotFound ? <p style={{color: "#FC2044", pAlign: "center"}}>{language.login_user_not_found}</p> : null }
        <p className="label">Password</p>
        <input onChange={(e) => setPassword(e.target.value)}  type="password" className="textinput email_input" value={password} />
        {/* <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", false)} onPress={() => securePassword ? setSecurePassword(false) : setSecurePassword(true)}>
          <div style={styles.touchable}>
            {securePassword ? <><p style={styles.icon}><Entypo name="eye" style= {styles.icon}/> Show</p></> : <><p style= {styles.icon}><Entypo name="eye-with-line" style={styles.icon}/> Hide</p></>}
          </div>
        </TouchableNativeFeedback> */}
        {wrongPassword ? <p style={{color: "#FC2044", pAlign: "center"}}>{language.login_wrong_password}</p> : null }
      </div>

      <div style={{ zIndex: 2, flex: 2, justifyContent: "center"}}>
      <Button
          fontColor={"white"}
          title={language.login}
          borderradius={100}
          color={"#0080FF"}
          onPress={() => handleLogin(email, password, () => navigation.navigate("home"))}
          hovercolor={"rgba(255,255,255,0.3)"}
          color2={"#004080"}
      />
      <p style={{fontFamily: "Poppins", color: "white", fontSize: "1.5rem", pAlign: "center", marginBottom: 10}}>OR</p>
      <Button
          fontColor={"white"}
          title={"Create your account"}
          borderradius={100}
          color={"#484F78"}
          onPress={() => setShowCreatePanel(true)}
          hovercolor={"rgba(255,255,255,0.3)"}
        />
      </div>

    </div>

  );
}

export default Login;

{/* <BrowserRouter>
      <Routes>
        <Route path="login" element={<Users/>} />
      </Routes>
    </BrowserRouter> */}

