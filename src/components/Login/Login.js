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
import { useNavigate } from "react-router-dom";

//Data
import { LanguageContext } from "../../data/LanguageContext";
import CreatePanel from './CreatePanel/CreatePanel'

//Custom Components
import Button from "../common/Button";

//Third Party
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

//CSS
import './Login.css'
import { shadeColor } from "../../data/Service";
import AuthInput from "../common/AuthInput";

const Login = ({ handleLogin, handleCreate, wrongPassword, emailInUse, userNotFound }) => {

  //navigation
  const navigate = useNavigate();

  //Conp
  const language = useContext(LanguageContext);

  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [showEmailLabel, setShowEmailLabel] = useState(false)
  const [showPasswordLabel, setShowPasswordLabel] = useState(false)

  //Ref
  const passwordInput = useRef().current;

  useEffect(() => {
    if (emailInUse) {
      setShowCreatePanel(true);
    }
  }, []);

  useEffect(() => {
    if (email == "") {
      setShowEmailLabel(false)
    }
    else {
      setShowEmailLabel(true);
    }
  },[email])

  useEffect(() => {
    if (password == "") {
      setShowPasswordLabel(false)
    }
    else {
      setShowPasswordLabel(true);
    }
  },[password])

    const checkForSpace = () => {
      let email_without_space;
      if (email.slice(-1) === " ") {
          email_without_space = email.substring(0, email.length-1);
          setEmail(email_without_space)
      }
    }

  return (
    <>

    <div className="login_container">

      <div className="content_container">

      <div
        className="heading_container"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "row",
          width: "100%"
        }}
      >
       <div style={{maxWidth: 700, display: "flex", flexDirection: "row", width: "100%", margin: "auto"}}> 
        <img
          style={{ height: "3rem", width: "3rem", alignSelf: "center"}}
          src={require('../../data/img/icon.png')}
          alt="WeedStats Logo"
        />
        <p
          style={{
            color: "white",
            fontSize: "1.5rem",
            fontFamily: "Poppins",
            textAlign: "center",
            fontWeight: 700, 
            marginLeft: "1rem"
          }}
        >
          WeedStats
        </p>
        </div>
      </div>

      <div style={{ zIndex: 2, justifyContent: "center", width: "100%", maxWidth: 500, display: "flex", flexDirection: "column"}}>

        <p className="label" style={{fontSize: "2rem", fontWeight: 700}}>Login</p>

        <AuthInput label={"E-Mail Adress"} onBlur={() => checkForSpace()} onChange={(text) => setEmail(text)} value={email} type={"email"}/>

        {userNotFound ? <p style={{color: "#FC2044", pAlign: "center"}}>{language.login_user_not_found}</p> : null }

        <AuthInput label={"Password"} onBlur={() => checkForSpace()} onChange={(text) => setPassword(text)} value={password} type={securePassword ? "password" : "text"}/>

        <div style={{height: "1rem"}}></div>
        <a className="toggle_link" onClick={() => setSecurePassword(!securePassword)}>{securePassword ? <><AiFillEye style={{marginBottom: -3}}/> {language.login_show_password}</> : <><AiFillEyeInvisible style={{marginBottom: -3}}/> {language.login_hide_password}</>}</a>

        {wrongPassword ? <p style={{color: "#FC2044", pAlign: "center"}}>{language.login_wrong_password}</p> : null }
      </div>

      <div style={{height: "2rem"}}></div>

      <div style={{ zIndex: 2, justifyContent: "center", width: "100%", display: "flex", flexDirection: "column", maxWidth: 500}}>
      <Button
          fontColor={"white"}
          title={language.login}
          borderradius={10}
          color={"#0080FF"}
          onPress={() => {handleLogin(email, password, () => navigate("/home"))}}
          hovercolor={shadeColor("#0080FF", -25)}
          color2={"#004080"}
          huge={true}
      />
      <p style={{fontFamily: "Poppins", color: "white", fontSize: "1rem", textAlign: "center"}}>OR</p>
      <Button
          fontColor={"white"}
          title={"Create your account"}
          borderradius={10}
          color={"#484F78"}
          onPress={() => navigate("/create")}
          hovercolor={shadeColor("#484F78", -25)}
          huge={true}
        />
      </div>

      </div> 

    </div>
</>
  );
}

export default Login;