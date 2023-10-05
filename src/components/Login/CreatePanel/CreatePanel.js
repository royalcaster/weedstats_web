//React
import React, { useEffect, useRef, useState, useContext } from "react";
import Button from '../../common/Button'
import { LanguageContext } from "../../../data/LanguageContext";

//CSS
import './CreatePanel.css'
import AuthInput from "../../common/AuthInput";

//Third Party
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { shadeColor } from "../../../data/Service";
import { useNavigate, Link } from "react-router-dom";

const CreatePanel = ({ handleCreate, onExit, emailInUse }) => {

    //Context
    const language = useContext(LanguageContext);

    //navigation
    const navigate = useNavigate();
    
    //State
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordSubmit, setPasswordSubmit] = useState("");
    const [securePassword, setSecurePassword] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordLengthValid, setPasswordLengthValid] = useState(false);
    const [passwordNumberValid, setPasswordNumberValid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);

    useEffect(() => {
       
    },[]);

    useEffect(() => {
        checkMatch();
    },[password, passwordSubmit]);


    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setEmailIsValid(false);
        }
        else {
            setEmailIsValid(true);
        }
    }

    const validatePassword = (text) => {
        if (/\d/.test(text) ) {
          setPasswordNumberValid(true);
        }
        else {
            setPasswordNumberValid(false);
        }
        if (text.length > 7) {
            setPasswordLengthValid(true);
        }
        else {
            setPasswordLengthValid(false);
        }
      }

      const checkMatch = () => {
        if (passwordSubmit === password) {
            setPasswordMatch(true);
        }
        else {
            setPasswordMatch(false);
        }
      }

    const checkForSpace = () => {
        let email_without_space;
        if (email.slice(-1) == " ") {
            email_without_space = email.substring(0, email.length-1);
            setEmail(email_without_space)
            validateEmail(email_without_space);
        }
    }

    return (
        <div className="container_create" style={{overflowY: "scroll", overflowX: "hidden"}}>

        <div className="create_content_container">

        <div
          className="heading_container"
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            cursor: "pointer"
          }}
          onClick={() => navigate("/about")}
          >
          <div style={{maxWidth: 700, display: "flex", flexDirection: "row", width: "100%", margin: "auto"}}> 
            <img
              style={{ height: "3rem", width: "3rem", alignSelf: "center"}}
              src={require('../../../data/img/icon.png')}
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

        <div style={{height: "1rem"}}></div>

        <p className="label" style={{fontSize: "2rem", fontWeight: 700}}>Create your account</p>
        <AuthInput onChange={(text) => setUserName(text)} value={userName} type={"text"} label={"Username"}/>

        
        <AuthInput  onBlur={() => checkForSpace()} onChange={(text) => {setEmail(text); validateEmail(text)}} value={email} type={"email"} label={"Email-Adress"}/>
        <p className="valid_label" style={{color: emailIsValid ? "#00DB4D" : "#FC2044"}}>Valid</p>

        {emailInUse ? <p style={{color: "#FC2044", textAlign: "center", fontFamily: "Poppins"}}>Email-Adress already in use</p> : null}


        <AuthInput onChange={(text) => {setPassword(text); validatePassword(text)}} value={password} label={"Password"} type={securePassword ? "password" : "text"}/>

        <p className="valid_label" style={{color: passwordLengthValid ? "#00DB4D" : "#FC2044"}}>At least 8 digits</p> 
        <p className="valid_label" style={{color: passwordNumberValid ? "#00DB4D" : "#FC2044"}}>At least 1 number</p>

        <AuthInput onChange={(text) => {setPasswordSubmit(text); checkMatch()}} value={passwordSubmit} label={"Confirm Password"} type={securePassword ? "password" : "text"}/>

        <p className="valid_label" style={{color: passwordMatch ? "#00DB4D" : "#FC2044"}}>Identical</p> 

        <div style={{height: "1rem"}}></div>
        <div style={{textAlign: "right"}}>
        <a className="toggle_link" onClick={() => setSecurePassword(!securePassword)}>{securePassword ? <><AiFillEye style={{marginBottom: -3}}/> {language.login_show_password}</> : <><AiFillEyeInvisible style={{marginBottom: -3}}/> {language.login_hide_password}</>}</a>
        
        </div>
        
        <div style={{height: "1rem"}}></div>

        <div style={{width: "100%", justifyContent: "center", display: "flex", flexDirection: "column"}}>
        <Button
          fontColor={!emailIsValid || !passwordLengthValid || !passwordNumberValid || !passwordMatch || userName.length == 0 ? shadeColor("#ffffff",-25) : "white"}
          title={"Create my account"}
          borderradius={10}
          color={!emailIsValid || !passwordLengthValid || !passwordNumberValid || !passwordMatch || userName.length == 0 ? shadeColor("#0080FF",-25) : "#0080FF"}
          onPress={() => handleCreate(userName, email, password)}
          hovercolor={shadeColor("#0080FF",-25)}
          color2={"#004080"}
          disabled={!emailIsValid || !passwordLengthValid || !passwordNumberValid || !passwordMatch || userName.length == 0}
          huge={true}
        />
        <Link to={"/login"} className="toggle_link" style={{alignSelf: "center", marginTop: 10}}>Already have an account? Sign in</Link>
        </div>
        <div style={{height: "2rem"}}></div>
        </div>
        </div>
    )
}

export default CreatePanel