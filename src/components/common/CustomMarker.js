//React
import React, { useContext, useEffect, useState } from "react";

//Custom Components
import ProfileImage from "./ProfileImage";
import TypeImage from "./TypeImage";
import { UserContext } from "../../data/UserContext";

const CustomMarker = ({ username, photoUrl, type, timestamp,  }) => {

    //Context
    const user = useContext(UserContext)

    const [showDate, setShowDate] = useState(false);

    /* useEffect(() => {
        if (!withOutDate) {
            if ((coordinate.latitude - region.latitude > 0.05) || (coordinate.longitude - region.longitude > 0.1)) {
                setShowDate(false);
            }
            else {
                setShowDate(true);
            }
        }
        
    },[region]); */

    return (
        <div>
            <div style={styles.container}>
                    
                     
                    <div style={{display: "flex",flexDirection: "row", alignSelf: "center", backgroundColor: username == user.username ? "#484F78" : "#131520", padding: 5, marginBottom: -10, paddingBottom: 10, borderRadius: 10, paddingRight: 5, paddingLeft: 5}}>
                        <TypeImage type={type} x={30} backgroundColor={"rgba(0,0,0,0)"}/>
                        <div style={{width: 5}}></div>
                        <p style={{color: "white", fontSize: "0.6rem", fontFamily: "Poppins"}}> {new Date(timestamp).toUTCString().substring(5,16)}{"\n"}{new Date(timestamp).toUTCString().substring(16,22)}</p>
                    </div>

                    <div style={styles.image}>
                        <ProfileImage x={50} url={photoUrl} type={1} circleColor={username == user.username ? "#484F78" : "#131520"} circle={false}/>
                    </div>
                    <div style={styles.dot}></div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: 100,
        display: "flex",
        flexDirection: "column"
    },
    image: {
        width: 57,
        height: 57,
        backgroundColor: "#1E2132",
        alignItems: "center",
        borderRadius: 100,
        paddingTop: 3.5,
        alignSelf: "center"
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: "#0080FF",
        borderRadius: 50,
        marginTop: -5,
        alignSelf: "center"
    }
};

export default CustomMarker