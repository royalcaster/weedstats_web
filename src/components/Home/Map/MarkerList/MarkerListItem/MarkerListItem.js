//React
import React, { useEffect, useRef, useContext } from "react";

//Service
import toGermanDate from "../../../../../data/DateConversion";
import { UserContext } from "../../../../../data/UserContext";

//Custom Components
import ProfileImage from "../../../../common/ProfileImage";
import TypeImage from "../../../../common/TypeImage";

const MarkerListItem = ({ marker, onPress }) => {

    //Context
    const user = useContext(UserContext)

    return (
            <div style={styles.container}>
                <div style={{backgroundColor: "#131520", flexDirection: "row", backgroundColor: marker.username == user.username ? "#484F78" : "#131520"}}>
                        {
                            marker ?
                            <>
                                <div style={{flex: 1}}>
                                    <ProfileImage url={marker.photoUrl} x={60}/>
                                </div>

                                <div style={{flex: 3, flexDirection: "column", paddingVertical: 10}}>
                                    <div style={{flex: 1, justifyContent: "center"}}>
                                        <p style={styles.username}>{marker.username}</p>
                                    </div>
                                    <div style={{flex: 1, justifyContent: "center"}}>
                                        <p style={styles.date}>{toGermanDate(new Date(marker.timestamp))}</p>
                                    </div>
                                </div>

                                <div style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                    <TypeImage type={marker.type} x={40}/>
                                </div>
                            </>
                            : null
                        }
                    </div>
            </div>
        
    );
}

export default MarkerListItem

const styles = {
    container: {
        overflow: "hidden",
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
        marginVertical: 5
    },
    username: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: "1rem"
    },
    date: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: "1rem"
    }
};