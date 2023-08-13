//React
import React, { useState, useEffect, useContext } from "react";

//Custom Components
import Button from "../../common/Button";
import ConfigItem from "./ConfigItem/ConfigItem";
import CustomLoader from "../../common/CustomLoader";
import ConfigToggle from "./ConfigToggle/ConfigToggle";
import ProfileImage from "../../common/ProfileImage";
import ProfileEditor from "./ProfileEditor/ProfileEditor"
import MemberSince from "../../common/MemberSince";

//Third Party
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import { BiLogOut, BiTrash } from "react-icons/bi"

//Service
import { LanguageContext } from "../../../data/LanguageContext";
import { ConfigContext } from "../../../data/ConfigContext";
import CustomModal from "../../common/CustomModal";
import { UserContext } from "../../../data/UserContext";

import "./Config.css"
import { shadeColor } from "../../../data/Service";

const Config = ({ toggleLanguage, loadSettings, deleteAccount, refreshUser, handleLogOut }) => {

  //Context
  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  const config = useContext(ConfigContext);

  //State
  const [localConfig, setLocalConfig] = useState(config);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(true);
  const [lightmode, setLightMode] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);

  useEffect(() => {
    if (config != null) {
      setLoading(false)
    }
  }, []);

  const storeSettings = async () => {
    console.log(localConfig);
    try {/* 
      const accessToken = JSON.parse(await AsyncStorage.getItem("accessToken"));
      await AsyncStorage.setItem("accessToken", JSON.stringify({
        email: accessToken.email,
        password: accessToken.password,
        localAuthenticationRequired: localConfig.localAuthenticationRequired  
      })); */
      toggleLanguage(localConfig.language);
      refreshUser({
        config: localConfig
      });
    } catch (e) {
      console.log("Error in Config beim Speichern: ", e);
    }
    loadSettings();
    setLoading(false);
    setSaved(true);
  };

  const handleLanguageSwitch = (lang) => {
    setLocalConfig({...localConfig, language: lang});
  }

  const lightmodeModalContent = <div
  style={{
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    height: "100%",
    top: 0,
    zIndex: 1000
  }}
>
  <div style={{flex:1, justifyContent: "flex-start"}}></div>
  <div
    style={{
      width: "90%",
      backgroundColor: "#1E2132",
      alignSelf: "center",
      borderRadius: 25,
      height: "50%"
    }}
  >
    <div style={{ flex: 1 }}>
      <p style={styles.heading}>
        {language.config_modal_title}
      </p>
    </div>
    <div style={{ flex: 2 }}>
      <p style={styles.text}>
        {language.config_modal_text}
      </p>
    </div>
    <div style={{ flex: 1 }}>
      <Button
        title={language.config_modal_thanks}
        color={"#484F78"}
        borderradius={25}
        fontColor={"white"}
        onPress={() => setLightMode(false)}
        hovercolor={"rgba(255,255,255,0.3)"}
      />
    </div>
  </div>
  <div style={{flex:1, justifyContent: "flex-end"}}></div>
</div>;

const deleteAccountModalContent = <div
style={{
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
  flex: 1
}}
>
<div
  style={{
    width: "90%",
    height: 300,
    backgroundColor: "#1E2132",
    alignSelf: "center",
    borderRadius: 25,
  }}
>
  <div style={{ flex: 1 }}>
    <p style={styles.heading}>
      {language.delete_account_title}
    </p>
  </div>
  <div style={{ flex: 1}}>
    <p style={{ fontSize: "2rem", maxWidth: "80%", fontFamily: "PoppinsMedium"}}>
      {language.delete_account_text}
    </p>
  </div>
  <div style={{ flex: 1, flexDirection: "row" }}>
    <div
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title={language.account_delete_account_cancel} onPress={() => setShowDelete(false)} color={"#484F78"} fontColor={"white"}/>
    </div>
    <div
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title={language.account_delete_account_submit} onPress={() => deleteAccount()} color={"#eb4034"} fontColor={"white"}/>
    </div>
  </div>
</div>
</div>;

const logOutModalContent = <div
 style={{
   alignItems: "center",
   justifyContent: "center",
   backgroundColor: "rgba(0,0,0,0.5)",
   flex: 1
 }}
>
 <div
   style={{
     width: "90%",
     height: 300,
     backgroundColor: "#1E2132",
     alignSelf: "center",
     borderRadius: 25,
   }}
 >
   <div style={{ flex: 1 }}>
     <p style={styles.heading}>
       {language.signout_title}
     </p>
   </div>
   <div style={{ flex: 1, flexDirection: "row" }}>
     <div
       style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
       }}
     >
       <Button title={language.account_delete_account_cancel} onPress={() => setShowLogOut(false)} color={"#484F78"} fontColor={"white"}/>
     </div>
     <div
       style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
       }}
     >
       <Button title={language.account_sign_out} onPress={() => handleLogOut()} color={"#eb4034"} fontColor={"white"}/>
     </div>
   </div>
 </div>
</div>;

  return (
    <>
      <div style={styles.container}>

      {showProfileEditor ? <ProfileEditor onExit={() => {setShowProfileEditor(false)}} refreshUser={refreshUser}/> : null}
        
        <CustomModal show={lightmode} child={lightmodeModalContent}/>

        <CustomModal show={showDelete} child={deleteAccountModalContent} />

        <CustomModal show={showLogOut} child={logOutModalContent}/>

        {loading ? (
          <div style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
            <CustomLoader x={50} color={"#0080FF"}/>
          </div>
        ) : (
          <div className="left" style={{height: "100%", position: "absolute", width: "100%", backgroundColor: "#1E2132", overflow: "scroll", maxWidth: 700, left: "50%"}}>

            <p style={styles.bold_heading}>{language.config_settings}</p>

            <p style={styles.heading}>Account</p>

            <div
              style={{
                alignItems: "center",
                display: "flex",
                flex: 1,
                flexDirection: "row",
                width: "95%",
                alignSelf: "center",
                height: 100,
                backgroundColor: "#484F78",
                borderRadius: 15,
                overflow: "hidden",
                margin: "auto",
                cursor: "pointer"
              }}

              onClick={() => {setShowProfileEditor(true)}}
            >
              <div style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>            
                <ProfileImage url={user.photoUrl} x={70} type={1} circle={false}/>  
              </div>

              <div style={{ flex: 3, justifyContent: "center"}}>
                <p style={styles.username}>{user.username}</p>
                <p style={styles.email}>{user.email}</p>
              </div>
            </div>
        
        <div style={{height: "1rem"}}></div>

          <MemberSince backgroundColor={"#131520"} timestamp={user.member_since}/>

        <div style={{height: "1rem"}}></div>
        <div style={{flexDirection: "row", width: "95%", alignSelf: "center", justifyContent: "space-around", display: "flex", margin: "auto"}}>
          <div style={{flex: 1}}>
            <Button
                onPress={() => setShowLogOut(true)}
                title={" " + language.account_sign_out}
                icon={<BiLogOut style={{fontSize: "1.5rem", marginBottom: -6}}/>}
                borderradius={10}
                color={"#eb4034"}
                fontColor={"white"}
                hovercolor={shadeColor("#eb4034",-25)}
                huge={true}
              />
          </div>
          <div style={{width: "1rem"}}></div>
          <div style={{flex: 1}}>
            <Button
                onPress={() => setShowDelete(true)}
                title={" " + language.account_delete_account}
                icon={<BiTrash style={{fontSize: "1.5rem", marginBottom: -6}}/>}
                borderradius={10}
                color={"#eb4034"}
                fontColor={"white"}
                hovercolor={shadeColor("#eb4034",-25)}
                huge={true}
              />
          </div>
        </div>

            <div style={{height: "1rem"}}></div>

            <p style={styles.heading}>{language.config_counter}</p>

            <div style={{width: "95%", margin: "auto"}}>

            <div style={{flexDirection: "row", width: "100%", alignSelf: "center", display: "flex"}}>

              <div style={{alignSelf: "center", flex: 1}}>
                <ConfigItem
                  type="joint"
                  config={localConfig.showJoint}
                  onToggle={() => {
                    setLocalConfig({ ...localConfig, showJoint: !localConfig.showJoint });
                    setSaved(false);
                  }}
                />
              </div>

              <div style={{alignSelf: "center", flex: 1}}>
                <ConfigItem
                  type="bong"
                  config={localConfig.showBong}
                  onToggle={() => {
                    setLocalConfig({ ...localConfig, showBong: !localConfig.showBong });
                    
                    setSaved(false);
                  }}
                />
              </div>
            

              <div style={{alignSelf: "center", flex: 1}}>
                <ConfigItem
                  type="vape"
                  config={localConfig.showVape}
                  onToggle={() => {
                    setLocalConfig({ ...localConfig, showVape: !localConfig.showVape });
                    
                    setSaved(false);
                  }}
                />
              </div>
              </div> 

              <div style={{flexDirection: "row", width: "100%", alignSelf: "center", display: "flex"}}>

              <div style={{alignSelf: "center", flex: 1}}>
                <ConfigItem
                  type="pipe"
                  config={localConfig.showPipe}
                  onToggle={() => {
                    setLocalConfig({ ...localConfig, showPipe: !localConfig.showPipe });
                    
                    setSaved(false);
                  }}
                />
              </div>

              <div style={{alignSelf: "center", flex: 1}}>
                <ConfigItem
                  type="cookie"
                  config={localConfig.showCookie}
                  onToggle={() => {
                    setLocalConfig({ ...localConfig, showCookie: !localConfig.showCookie });
                    
                    setSaved(false);
                  }}
                />
              </div>
            </div> 
            </div>

            <div style={{height: "1rem"}}></div>      
            <p style={styles.heading}>{language.config_personal_data}</p>
            
            <ConfigToggle
              value={localConfig.shareMainCounter}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareMainCounter: !localConfig.shareMainCounter,
                });
                setSaved(false);
              }}
              disabled={false}
              label={language.config_share_main_counter}
            />

            <ConfigToggle
              label={language.config_share_detail_counter}
              disabled={!localConfig.shareMainCounter}
              value={localConfig.shareTypeCounters}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareTypeCounters: !localConfig.shareTypeCounters,
                });
                setSaved(false);
              }}
            />

            <ConfigToggle
              label={language.config_share_last_activity}
              value={localConfig.shareLastEntry}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareLastEntry: !localConfig.shareLastEntry,
                });
                setSaved(false);
              }}
            />

            <ConfigToggle
              label={language.config_get_location}
              value={localConfig.saveGPS}
              onPress={() => {
                setLocalConfig({ ...localConfig, saveGPS: !localConfig.saveGPS });
                setSaved(false);
              }}
            />

            <ConfigToggle
              label={language.config_share_location}
              disabled={!localConfig.saveGPS}
              value={localConfig.shareGPS}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  shareGPS: !localConfig.shareGPS,
                });
                setSaved(false);
              }}
            />

            <div style={{ height: 30 }}></div>

            <p style={styles.heading}>{language.config_security}</p>
            <div style={{ height: 5 }}></div>

            <ConfigToggle
            label={language.config_unlock_on_launch}
              value={localConfig.localAuthenticationRequired}
              onPress={() => {
                setLocalConfig({
                  ...localConfig,
                  localAuthenticationRequired: !localConfig.localAuthenticationRequired,
                });
                setSaved(false);
              }}
            />

            <div style={{ height: 30 }}></div>

            <p style={styles.heading}>{language.config_language}</p>
            <div style={{ height: 5 }}></div>

            <LanguageSelector toggleLanguage={(lang) => {handleLanguageSwitch(lang); setSaved(false)}} value={localConfig.language} />

            <div style={{ height: 30 }}></div>

            <p style={styles.heading}>{language.config_other}</p>
            <div style={{ height: 5 }}></div>

            <ConfigToggle
              label={language.config_lightmode}
              value={lightmode}
              onPress={(val) => {setLightMode(true);}}
            />

          <div style={{height: "12%"}}></div>
          </div>   
          )}

          <div style={styles.save_button_container}>
            
          </div>
      </div>
    </>
  );
};

export default Config;

const styles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1E2132",
    justifyContent: "center"
  },
  heading: {
    color: "white",
    fontSize: "1.3rem",
    fontFamily: "Poppins",
    marginLeft: "1rem",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: "2.5",
  },
  text: {
    alignSelf: "center",
    fontFamily: "Poppins",
    fontSize: 18,
    color: "white",
    maxWidth: 250,
    textAlign: "center",
  },
  save_button_container: {
    width: "100%",
    position: "absolute",
    bottom: "10%"
  },
  toggle_container: {
    flexDirection: "row",
    height: 40,
    width: "95%",
    alignContent: "center",
  },
  bold_heading: {
    color: "white",
    fontFamily: "Poppins",
    fontSize: "2rem",
    fontWeight: 700,
    marginLeft: "1rem"
  },
  username: {
    color: "white",
    fontSize: "1rem",
    fontFamily: "Poppins",
    margin: 0,
    fontWeight: 700
  },
  email: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "0.75rem",
    fontFamily: "Poppins",
    margin: 0
  },
  touchable_profileimage: {
    zIndex: 1,
    position: "absolute",
    height: 70,
    width: 70,
    borderRadius: 100
  },
  money_icon: {
    fontSize: 25,
    color: "white",
    textAlignVertical: "center",
  },
};