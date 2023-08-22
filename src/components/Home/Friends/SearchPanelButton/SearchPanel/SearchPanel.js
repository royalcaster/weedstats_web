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
import { downloadUser } from "../../../../../data/Service";
import CustomModal from "../../../../common/CustomModal";
import CustomLoader from "../../../../common/CustomLoader";

const SearchPanel = ({onExit}) => {

    const user = useContext(UserContext)
    const language = useContext(LanguageContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [activeRequested, setActiveRequested] = useState(null);
    const [alreadySent, setAlreadySent] = useState(false);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchUsers = async (text) => {
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

    const friendModalContent = <div style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)"}}>
    <div style={styles.modal_container}>
        {!alreadySent ? <><div style={{flex: 1, justifyContent: "center", paddingHorizontal: 50}}>

            {language.language_short == "de" ? 
            <p style={styles.heading}><p style={{color: "#0080FF"}}>{activeRequested ? activeRequested.username : null}</p> {language.searchpanel_question}</p>
            :
            <p style={styles.heading}>{language.searchpanel_question}<p style={{color: "#0080FF"}}> {activeRequested ? activeRequested.username : null}</p> ? </p>
            }

            
        </div>
        <div style={{flex: 1, flexDirection: "row"}}>
            <div style={{flex: 1, justifyContent: "center", alignItems: "center"}}>   
                <Button title={language.cancel} onPress={() => setModalVisible(false)} color={"#484F78"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"}/>
            </div>
            <div style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Button title={language.send} onPress={() => makeFriendRequest(activeRequested.id)} color={"#00DB4D"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"}/>
            </div>
        </div></> 
        
        : <div style={{flex: 1, justifyContent: "center"}}>
            <div style={{height: 30}}></div>
            {language.short == "de" ? <p style={styles.heading}>Du hast bereits eine Freundschaftsanfrage an <p style={{color: "#0080FF"}}>{activeRequested ? activeRequested.username : null}</p> gesendet.</p> 
            : <p style={styles.heading}>You already sent a request to <p style={{color: "#0080FF"}}>{activeRequested ? activeRequested.username : null}</p></p>}
            <div style={{flex: 1, justifyContent: "center", alignItems: "center"}}> 
                <Button title={"Ok"} onPress={() => setModalVisible(false)} color={"#484F78"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"}/>
            </div>
        </div>}
    </div>
</div>;

    return (
        <div style={styles.container}>
            <div style={{height: 10}}></div>
                
            <CustomModal show={modalVisible} child={friendModalContent}/>

            <div
            style={{ width: "100%", flexDirection: "row"}}
            >
                <div style={{ flex: 1, alignItems: "center" }}>
                    <BackButton onPress={() => onExit()} />
                </div>
                <div style={{ flex: 5, justifyContent: "center"}}>
                    <p style={[styles.heading,{textAlign: "left"}]}>{language.searchpanel_title}</p>
                </div>
            </div>

            <input /* ref={textInputRef} */ blurOnSubmit={true} autoFocus={true} style={styles.input} onChangeText={(text) => {searchUsers(text)}}></input>
            
            <div style={{width: "100%", flex: 1, alignSelf: "center", marginTop: 20}}>

            {!results || results.length == 0 ? 
            <div style={{width: "100%", marginTop: 100}}>
                <Empty title={language.searchpanel_empty}/>
            </div> : <>
            {loading ? <CustomLoader color={"blue"} x={50}/> : (
                results.map((result) => {
                    return <FriendListItem key={Math.random()} friend={result} onPress={() => {setActiveRequested(result);setModalVisible(true)}}/>
                })
            )}
            </>}

            </div>

            
        </div>
    );
}

export default SearchPanel

const styles = {
    container: {
        width: "100vw",
        position: "absolute",
        backgroundColor: "#131520",
        height: "100vh",
        top: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        zIndex: 1000000
    },
    input: {
        backgroundColor: "#1E2132",
        width: "90%",
        alignSelf: "center",
        height: 60,
        borderRadius: 10,
        paddingLeft: 20,
        color: "white",
        fontSize: 18,
        fontFamily: "PoppinsMedium",
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
        fontFamily: "PoppinsMedium",
        fontSize: "2rem",
        textAlign: "center",
        textAlign: "center", 
        maxWidth: "80%", 
        alignSelf: "center"
    },
    touchable: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        fontSize: 40
    }
};