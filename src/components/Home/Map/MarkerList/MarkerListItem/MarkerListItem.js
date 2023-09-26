//React
import React, { useEffect, useRef, useContext, useState } from "react";

//Service
import toGermanDate from "../../../../../data/DateConversion";
import { UserContext } from "../../../../../data/UserContext";
import { shadeColor } from "../../../../../data/Service";

//Custom Components
import ProfileImage from "../../../../common/ProfileImage";
import TypeImage from "../../../../common/TypeImage";


const MarkerListItem = ({ marker, onPress }) => {

    //Context
    const user = useContext(UserContext)

    //State
    const [hover, setHover] = useState(false);

    return (
            <div style={styles.container} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => onPress()}>
                <div style={{ display: "flex", flexDirection: "row", backgroundColor: marker.username == user.username ? hover ? shadeColor("#484F78",-25) : "#484F78" : hover ? shadeColor("#131520",-25) : "#131520", width: "100%", alignItems: "center"}}>
                        {
                            marker ?
                            <>
                                <div>
                                    <ProfileImage url={marker.photoUrl} x={60}/>
                                </div>
                                <div style={{width: 10}}></div>
                                <div style={{flex: 6, flexDirection: "column"}}>
                                    
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
        width: "100%",
        alignSelf: "center",
        display: "flex",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "green"
    },
    username: {
        color: "white",
        fontFamily: "Poppins",
        fontSize: "1rem",
        margin: 0
    },
    date: {
        color: "white",
        fontFamily: "Poppins",
        fontSize: "0.75rem",
        margin: 0
    }
};