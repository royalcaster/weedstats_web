//React
import React, {useContext, useEffect, useRef, useState} from "react";

//Custom Components
import BackButton from '../../../../common/BackButton'
import FriendListItem from "../../FriendList/FriendListItem/FriendListItem";
import Button from "../../../../common/Button";
import Empty from "../../../../common/Empty";

//Firebase
import { doc, getDoc, updateDoc, getDocs, collection, query, where } from "@firebase/firestore";
import { firestore } from "../../../../../data/FirebaseConfig";


//Service
import { UserContext } from "../../../../../data/UserContext";
import { LanguageContext } from "../../../../../data/LanguageContext";
import { downloadUser, shadeColor } from "../../../../../data/Service";
import CustomModal from "../../../../common/CustomModal";
import CustomLoader from "../../../../common/CustomLoader";

import './SearchPanel.css'

const SearchPanel = ({onExit}) => {

    const user = useContext(UserContext)
    const language = useContext(LanguageContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [activeRequested, setActiveRequested] = useState(null);
    const [alreadySent, setAlreadySent] = useState(false);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchUsers = async (text) => {
        console.log(text)
        setLoading(true);
        var resultBuffer = [];

        var length = text.length;
        if (length != 0) {
            try {
                const docRef = collection(firestore,"users");
                const q = query(docRef, where("username_array", "array-contains", text.toUpperCase()));
                const docSnap = await getDocs(q);
    
                docSnap.forEach((doc) => {
                    if (doc.exists()) {
                        resultBuffer.push(doc.data());
                       }
                });
            }
            catch(e){
                console.log("Error", e);
            }
        }
        else {
            setResults(null);
        }

        setResults(resultBuffer);
        setLoading(false);
    }

    const makeFriendRequest = async (id) => {

        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);

        var requested;
        if (docSnap.exists()) {
                requested = {
                id: docSnap.data().id,
                requests: docSnap.data().requests
            }
        }

        if (requested.requests != null && requested.requests.includes(user.id)) {
            console.log("Anfrage bereits gesendet!");
            setAlreadySent(true);
        }
        else {
            try{
                const docRef = doc(firestore, "users", requested.id);
                const docSnap = await getDoc(docRef);
                
                
                if (docSnap.exists()) {
                    var buffer = docSnap.data().requests;
                    updateDoc(docRef,{
                        requests: buffer.concat(user.id)
                    });
                }
            }
            catch(e){
                console.log("Error:", e)
            }
        setModalVisible(false);
        }
    }

    const friendModalContent = (
    <div style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.75)",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }}>
    <div style={{
        width: "90%",
        backgroundColor: "#1E2132",
        alignSelf: "center",
        borderRadius: 25,
        maxWidth: 500
    }}>
        <div style={{height: "2rem"}}></div>
        {!alreadySent ? <><div style={{flex: 1, justifyContent: "center", paddingHorizontal: 50}}>

            {language.language_short == "de" ? 
            <p style={styles.heading_modal2}><span style={{color: "#0080FF"}}>{activeRequested ? activeRequested.username : null}</span> {language.searchpanel_question}</p>
            :
            <p style={styles.heading_modal2}>{language.searchpanel_question}<p style={{color: "#0080FF"}}> {activeRequested ? activeRequested.username : null}</p> ? </p>
            }
        </div>

        <div style={{height: "2rem"}}></div>

        <div style={{flex: 1, flexDirection: "row"}}>
            <div style={{flex: 1, justifyContent: "center", alignItems: "center"}}>   
                <Button title={language.send} onPress={() => makeFriendRequest(activeRequested.id)} color={"#00DB4D"} fontColor={"white"} hovercolor={shadeColor("#00DB4D",-25)} borderradius={10}/>
            </div>
            <div style={{height: "1rem"}}></div>
            <div style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Button title={language.cancel} onPress={() => setModalVisible(false)} color={"#484F78"} fontColor={"white"} hovercolor={shadeColor("#484F78",-25)} borderradius={10}/>
            </div>
        </div>
        <div style={{height: "2rem"}}></div>
        </> 
        
        : <div style={{flex: 1, justifyContent: "center"}}>
            <div style={{height: 30}}></div>
            {language.short == "de" ? <p style={styles.heading}>Du hast bereits eine Freundschaftsanfrage an <p style={{color: "#0080FF"}}>{activeRequested ? activeRequested.username : null}</p> gesendet.</p> 
            : <p style={styles.heading}>You already sent a request to <p style={{color: "#0080FF"}}>{activeRequested ? activeRequested.username : null}</p></p>}
            <div style={{flex: 1, justifyContent: "center", alignItems: "center"}}> 
                <Button title={"Ok"} onPress={() => setModalVisible(false)} color={"#484F78"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"}/>
            </div>
        </div>}
    </div>
</div>);

    return (
        <div style={styles.container}>

            <CustomModal show={modalVisible} child={friendModalContent}/>

            <div style={{maxWidth: 700, margin: "auto"}}>

            <div style={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                <div style={{marginLeft: "1rem"}}>
                    <BackButton onPress={() => onExit()} hoverColor={"rgba(255,255,255,0.25)"}/>
                </div>
                <div style={{width: "1rem"}}></div>
                <div>
                <p style={styles.heading}>{language.searchpanel_title}</p>
                </div>
            </div>

            <div style={{margin: "auto", width: "95%"}}>
                <input /* ref={textInputRef} */ placeholder={language.searchpanel_title} className="text_input" autoFocus={true} style={styles.input} onChange={(e) => {searchUsers(e.target.value)}}></input>
            </div>

            <div style={{width: "100%", height: "50%", alignSelf: "center", marginTop: 20}}>

            {!results || results.length == 0 ? 
            <div style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                <div style={{height: "4rem"}}></div>
                <Empty title={language.searchpanel_empty}/>
            </div> : <>
            {loading ? <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: 300}}><CustomLoader color={"#484F78"} x={50}/></div> : (
                results.map((result) => {
                    return <FriendListItem key={Math.random()} friend={result} onPress={() => {setActiveRequested(result);setModalVisible(true)}}/>
                })
            )}
            </>}

            </div>

            </div>
        </div>
    );
}

export default SearchPanel

const styles = {
    container: {
        width: "100vw",
        position: "absolute",
        backgroundColor: "#1E2132",
        height: "100vh",
        top: 0
    },
    input: {
        backgroundColor: "#131520",
        alignSelf: "center",
        height: 40,
        borderRadius: 10,
        color: "white",
        fontSize: 18,
        fontFamily: "Poppins",
    },
    modal_container: {
        backgroundColor: "#1E2132",
        width: "90%",
        height: 300,
        alignSelf: "center",
        borderRadius: 25,
        flexDirection: "column"
    },
    heading: {
        color: "white",
        fontSize: "1.5rem",
        fontFamily: "Poppins",
        textAlign: "left",
      },
    touchable: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        fontSize: 40
    },
    heading_modal: {
        color: "white",
        fontSize: "1.3rem",
        fontFamily: "Poppins",
        marginLeft: "1rem",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: "2.5",
        margin: 0,
      },
      heading_modal2: {
        color: "white",
        fontFamily: "Poppins",
        marginLeft: "1rem",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: "1.5rem",
        margin: 0,
      }
};