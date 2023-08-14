//React
import React, { useEffect, useRef, useState, useContext } from "react";

//Custom Components
import BackButton from "../../../common/BackButton";
import Button from "../../../common/Button";
import CustomLoader from "../../../common/CustomLoader";
import ProfileImage from "../../../common/ProfileImage";
import AuthInput from '../../../common/AuthInput'

//Service
import { createUsernameArray, shadeColor } from "../../../../data/Service";
import { ref, uploadBytes, getDownloadURL, deleteObject } from '@firebase/storage'
import { storage } from "../../../../data/FirebaseConfig";

//Data
import { LanguageContext } from "../../../../data/LanguageContext";
import { UserContext } from "../../../../data/UserContext";

const ProfileEditor = ({ onExit, refreshUser}) => {

    //Context
    const language = useContext(LanguageContext);
    const user = useContext(UserContext);

    //State
    const [showWarning, setShowWarning] = useState(false);
    const [image, setImage] = useState(user.photoUrl);
    const [userName, setUserName] = useState(user.username);
    const [loading, setLoading] = useState(false);

    const saveChanges = async () => {

      if (user.photoUrl != "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png") {
        //Delete Old Profile Picture
        const fileRef = ref(storage, "profile-pictures/" + user.id + ".png");
        // Delete the file
        deleteObject(fileRef).then(() => {
          
        }).catch((error) => {
          console.log("Error beim Löschen des alten Profilbilds:" + error);
        });
      }
        
        if (image != null && userName.length > 0) {
            setLoading(true);
            let downloadUri = await uploadImageAsync(image);
            await refreshUser({
                username: userName,
                photoUrl: downloadUri,
                username_array: createUsernameArray(userName.toUpperCase())
            });
        }
        else {
            setShowWarning(true);
        }

        setLoading(false);
    }

    //1:1 aus einem Expo Beispiel geklaut, als ob ich plan von http hab lol
    async function uploadImageAsync(uri) {
        setLoading(true);
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
      
        const fileRef = ref(storage, "profile-pictures/" + user.id + ".png");
        const result = await uploadBytes(fileRef, blob);
        // We're done with the blob, close and release it
        blob.close();
        return await getDownloadURL(fileRef);
      }

    return (
        <div style={styles.container}>

          

        <div style={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
          <div style={{marginLeft: "1rem"}}>
              <BackButton onPress={() => onExit()} hoverColor={"rgba(255,255,255,0.25)"}/>
          </div>
          <div style={{width: "1rem"}}></div>
          <div>
            <p style={styles.heading}>{language.edit_your_profile}</p>
          </div>
        </div>

        <div style={{width: "90%", maxWidth: 500, margin: "auto"}}>

        <p style={styles.label}>{language.profile_image}</p>
        {loading ? <CustomLoader x={50}/> :
            <div style={{position: "relative", alignSelf: "center", margin: "auto"}}>
                <ProfileImage url={image} type={1} x={150}/>
            </div>
        }
        <div style={{height: "2rem"}}></div>

        <Button
          fontColor={"white"}
          title={language.search_gallery}
          borderradius={10}
          color={"#484F78"}
          onPress={async () => console.log("html upload form implementieren")}
          hovercolor={shadeColor("#484F78",-25)}
          huge={true}
        />

        <div style={{height: "2rem"}}></div>

        <p style={styles.label}>{language.username}</p>
        <input style={styles.text_input} label={language.username} onBlur={() => null} onChange={(e) => setUserName(e.target.value)} type={"text"} value={userName}/>
        

        <div style={{height: 10}}></div>

        {showWarning ? <p style={styles.warning}>{language.please_check_your_entries}</p> : null}

        <div style={{height: 40}}></div>
        
        <Button
          fontColor={"white"}
          title={language.config_save}
          borderradius={10}
          color={"#0080FF"}
          onPress={() => saveChanges()}
          hovercolor={shadeColor("#0080FF",-25)}
          color2={"#004080"}
          huge={true}
        />
        <div style={{height: "1rem"}}></div>
        <Button
            fontColor={"white"}
            title={language.account_delete_account_cancel}
            borderradius={10}
            color={"#484F78"}
            onPress={() => onExit()}
            hovercolor={shadeColor("#484F78",-25)}
            huge={true}
            />
        </div>
        </div>
    )
}

export default ProfileEditor

const styles = {
    container: {
        position: "absolute",
        backgroundColor: "#1E2132",
        borderRadius: 10,
        height: "100%",
        width: "100%",
        zIndex: 10
    },
    text_input: {
        backgroundColor: "#131520",
        borderRadius: 10,
        padding: 15,
        width: "80%",
        alignSelf: "center",
        marginVertical: 5,
        fontFamily: "Poppins",
        fontSize: "1rem",
        color: "white",
        border: "none"
      },
      label: {
        color: "white",
        fontSize: "1rem",
        fontFamily: "Poppins",
        left: "10%",
        marginTop: 20
      },
      warning: {
        color: "#eb4034",
        fontFamily: "Poppins",
        textAlign: "center"
      },
      heading: {
        color: "white",
        fontSize: "1.5rem",
        fontFamily: "Poppins",
        textAlign: "left",
      },
};