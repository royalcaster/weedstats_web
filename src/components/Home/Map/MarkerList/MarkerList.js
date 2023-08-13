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
            <div style={{height: 20}}></div>
     
            <div
            style={{ width: "100%", flexDirection: "row"}}
            >
                <div style={{ flex: 1, alignItems: "center" }}>
                    <BackButton onPress={() => console.log("BackButton in MarkerList implementieren!")} />
                </div>
                <div style={{ flex: 5, justifyContent: "center"}}>
                    <p style={{color: "white", fontFamily: "PoppinsMedium",fontSize: 20, textAlign: "left"}}>
                        {language.friends_friends} - {language.friendpage_last_activity}
                    </p>
                </div>
            </div>
            
            {
                markers.length != 0 ? markers.sort((a,b) => a.timestamp < b.timestamp).map((marker) => {
                    return <MarkerListItem key={uuidv4()} marker={marker} onPress={() => handlePress(marker)}/>
                }) : <Empty title={language.map_no_friends} tip={language.map_no_friends_tip}/>
            }
        </div>
    );
}

export default MarkerList

const styles = {
    container: {
        height: "90%",
        width: "100%",
        backgroundColor: "#1E2132",
        zIndex: 10,
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
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
    }
};