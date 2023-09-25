//React
import React, {useContext, useEffect, useRef, useState} from "react";

//Custom Components
import BackButton from "../../../common/BackButton";
import Empty from "../../../common/Empty";

//Service
import { UserContext } from "../../../../data/UserContext";
import { LanguageContext } from "../../../../data/LanguageContext";
import { FriendListContext } from "../../../../data/FriendListContext";
import MarkerListItem from "./MarkerListItem/MarkerListItem";
import { uuidv4 } from "@firebase/util";

const MarkerList = ({onExit, setRegion, markers, onRefresh}) => {

    //Context
    const user = useContext(UserContext)
    const language = useContext(LanguageContext);
    const friendList = useContext(FriendListContext)

    //State
    const [refreshing, setRefreshing] = useState(false);


    //Refs
    const textInputRef = useRef(null);

    const handlePress = (marker) => {
        setRegion({
            center: {
               latitude: marker.latitude,
               longitude: marker.longitude,
           },
           pitch: 0,
           zoom: 15
        }, 1000);
        console.log("onExit auf MarkerList");
    }

    return (
        <div style={styles.container}>
            <div style={styles.content_container} className="content_container">
                
        <div style={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                <div style={{marginLeft: "1rem"}}>
                    <BackButton onPress={() => onExit()} hoverColor={"rgba(255,255,255,0.25)"}/>
                </div>
                <div style={{width: "1rem"}}></div>
                <div>
                <p style={styles.heading}>{language.friends_friends} - {language.friendpage_last_activity}</p>
                </div>
            </div>

                <div style={{overflowY: "scroll"}}>
                    {
                        markers.length != 0 ? markers.sort((a,b) => a.timestamp < b.timestamp).map((marker) => {
                            return <MarkerListItem key={uuidv4()} marker={marker} onPress={() => handlePress(marker)}/>
                        }) : <Empty title={language.map_no_friends} tip={language.map_no_friends_tip}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default MarkerList

const styles = {
    container: {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 100,
        display: "flex",
        justifyContent: "center"
    },
    content_container: {
        backgroundColor: "#1E2132",
        zIndex: 10,
        position: "absolute",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        maxWidth: 700,
        margin: "auto"
    },
    input: {
        backgroundColor: "#1E2132",
        width: "90%",
        alignSelf: "center",
        height: 60,
        borderRadius: 10,
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
        fontSize: "1.5rem",
        fontFamily: "Poppins",
        textAlign: "left",
      },
};