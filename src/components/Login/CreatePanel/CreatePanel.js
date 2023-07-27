//React
import React, { useEffect, useRef, useState, useContext } from "react";
import Button from '../../common/Button'
import { LanguageContext } from "../../../data/LanguageContext";

//CSS
import './CreatePanel.css'

const CreatePanel = ({ handleCreate, onExit, emailInUse }) => {

    //Context
    const language = useContext(LanguageContext);
    
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

    const hide = () => {
        console.log("exit createpanel");
    }

    return (
        <div className="container">
       
        <div style={{height: 50}}></div>

        <p className="label" style={{fontSize: "3rem"}}>Create your account</p>

        <p className="label">Username</p>
        {/* <TextInput onChangeText={(text) => setUserName(text)} style={[styles.textinput, styles.password_input]} value={userName}/> */}
        <input className="textinput password_input" onChange={(text) => setUserName(text)} value={userName}/>

        <p className="label">
            Email-Adress
            <p className="valid_label" style={{color: emailIsValid ? "#00DB4D" : "#FC2044"}}>   Valid</p>
        </p>
        {/* <TextInput onBlur={() => checkForSpace()} onChangeText={(text) => {setEmail(text); validateEmail(text)}} style={[styles.textinput, styles.password_input]} value={email}/> */}
        <input onBlur={() => checkForSpace()} className="textinput password_input" onChange={(text) => {setEmail(text); validateEmail(text)}} value={email}/>
        {emailInUse ? <p style={{color: "#FC2044", textAlign: "center"}}>Email-Adress already in use</p> : null}

        {/* <Text style={styles.label}>Telefonnummer</Text>
        <TextInput onChangeText={(text) => setPhoneNumber(text)} style={[styles.textinput, styles.password_input]} value={phoneNumber}/> */}

        <p className="label">
            Password
            <p className="valid_label" style={{color: passwordLengthValid ? "#00DB4D" : "#FC2044"}}>   At least 8 digits</p> 
            <p className="valid_label" style={{color: passwordNumberValid ? "#00DB4D" : "#FC2044"}}>   At least 1 number</p>
        </p>
             
        
{/*         <TextInput onChangeText={(text) => {setPassword(text); validatePassword(text)}} secureTextEntry={securePassword} style={[styles.textinput, styles.password_input]} value={password}/>
*/}        <input className="textinput password_input" onChange={(text) => {setPassword(text); validatePassword(text)}} value={password}/>


        <p className="label">
            Confirm password
            <p className="valid_label" style={{color: passwordMatch ? "#00DB4D" : "#FC2044"}}>   identical</p>
        </p>
{/*         <TextInput onChangeText={(text) => {setPasswordSubmit(text); checkMatch()}} secureTextEntry={securePassword} style={[styles.textinput, styles.password_input]} value={passwordSubmit}/>
 */}        <input className="textinput password_input" onChange={(text) => {setPasswordSubmit(text); checkMatch()}} />


        {/* <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", false)} onPress={() => securePassword ? setSecurePassword(false) : setSecurePassword(true)}>
          <View style={styles.touchable}>
            {securePassword ? <><Text style={styles.icon}><Entypo name="eye" style= {styles.icon}/> Show</Text></> : <><Text style= {styles.icon}><Entypo name="eye-with-line" style={styles.icon}/> Hide</Text></>}
          </View>
        </TouchableNativeFeedback> */}

        <div style={{height: 40}}></div>
        
        <Button
          fontColor={!emailIsValid || !passwordLengthValid || !passwordNumberValid || !passwordMatch || userName.length == 0 ? "#484F78" : "white"}
          title={"Create my account"}
          borderradius={100}
          color={"#0080FF"}
          onPress={() => handleCreate(userName, email, password)}
          hovercolor={"rgba(255,255,255,0.3)"}
          color2={"#004080"}
          disabled={!emailIsValid || !passwordLengthValid || !passwordNumberValid || !passwordMatch || userName.length == 0}
        />
        <Button
            fontColor={"white"}
            title={"Cancel"}
            borderradius={100}
            color={"#484F78"}
            onPress={() => hide()}
            hovercolor={"rgba(255,255,255,0.3)"}
            />

        </div>
    )
}

export default CreatePanel