//React
import React, { useContext, useEffect, useState } from "react";

//Custom Components
import ProfileImage from "./ProfileImage";
import TypeImage from "./TypeImage";
import { UserContext } from "../../data/UserContext";

import moment from "moment/moment";

import './CustomMarker.css'

const CustomMarker = ({ username, photoUrl, type, timestamp, onClick }) => {

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
            <div onClick={() => onClick()} style={{cursor: "pointer"}}>
                    <div className="info_container" style={{backgroundColor: username == user.username ? "#484F78" : "#131520"}}>
                        <div style={{width: 5}}></div>
                        <TypeImage type={type} x={40}/>
                        <p style={{color: "white", fontSize: "0.6rem", fontFamily: "Poppins", textAlign: "right"}}> {moment(timestamp).format("l").toString()} {/* {new Date(timestamp).toUTCString().substring(5,16)} */}{"\n"}{new Date(timestamp).toUTCString().substring(16,22)}</p>
                        <div style={{width: 5}}></div>
                    </div>

                    <div className="image_container">
                        <ProfileImage x={50} url={photoUrl} type={1} circleColor={username == user.username ? "#484F78" : "#131520"} circle={true}/>
                    </div> 
                    <div style={styles.dot}></div>
            </div>
    );
}

const styles = {
    dot: {
        width: 10,
        height: 10,
        backgroundColor: "#0080FF",
        borderRadius: 50,
        marginTop: -5,
        alignSelf: "center",
        position: "absolute"
    }
};

export default CustomMarker