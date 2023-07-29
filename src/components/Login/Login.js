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

//Custom Components
import Button from "../common/Button";

//Third Party
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

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
          zIndex: 2,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        
        <img
          style={{ height: 100, width: 100, alignSelf: "center"}}
          src={require('../../data/img/icon.png')}
          alt="WeedStats Logo"
        />
        <p
          style={{
            color: "white",
            fontSize: "2rem",
            fontFamily: "Poppins",
            textAlign: "center",
            marginTop: 10,
            fontWeight: 700,
          }}
        >
          WeedStats
        </p>
      </div>

      <div style={{ zIndex: 2, justifyContent: "center", width: "80%", maxWidth: 500, display: "flex", flexDirection: "column"}}>
        <p className="label">E-Mail Adress</p>
        <input autoFocus onBlur={() => checkForSpace()} type="email" className="textinput"  value={email} onChange={(e) => setEmail(e.target.value)}/>
        {userNotFound ? <p style={{color: "#FC2044", pAlign: "center"}}>{language.login_user_not_found}</p> : null }
        <p className="label">Password</p>
        <input onChange={(e) => setPassword(e.target.value)}  type={securePassword ? "password" : "text"} className="textinput" value={password} />
        
        <div style={{height: "1rem"}}></div>
        <a className="toggle_link" onClick={() => setSecurePassword(!securePassword)}>{securePassword ? <><AiFillEye style={{marginBottom: -3}}/> {language.login_show_password}</> : <><AiFillEyeInvisible style={{marginBottom: -3}}/> {language.login_hide_password}</>}</a>

        {wrongPassword ? <p style={{color: "#FC2044", pAlign: "center"}}>{language.login_wrong_password}</p> : null }
      </div>

      <div style={{height: "2rem"}}></div>

      <div style={{ zIndex: 2, justifyContent: "center", width: "100%", display: "flex", flexDirection: "column"}}>
      <Button
          fontColor={"white"}
          title={language.login}
          borderradius={10}
          color={"#0080FF"}
          onPress={() => {handleLogin(email, password, () => navigation.navigate("/home")); console.log(email, password);}}
          hovercolor={"rgba(255,255,255,0.3)"}
          color2={"#004080"}
      />
      <p style={{fontFamily: "Poppins", color: "white", fontSize: "1rem", textAlign: "center"}}>OR</p>
      <Button
          fontColor={"white"}
          title={"Create your account"}
          borderradius={10}
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

