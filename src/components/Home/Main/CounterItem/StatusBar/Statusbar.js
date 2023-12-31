import React, { useEffect, useRef, useState } from "react";

const Statusbar = ({ status }) => {

    const [levelStatus, setLevelStatus] = useState(status);
    const [containerWidth, setContainerWidth] = useState(300);
    const animateTarget = (containerWidth * status / 100) - containerWidth;

    /* const slideAnim = useRef(new Animated.Value(-400)).current; */

      /* Animated.timing(
        slideAnim, {
            toValue: animateTarget,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.bezier(0, 1.02, 0.21, 0.97),
            delay: 0
        }
    ).start(); */

    const chopStatus = () => {
        if (Number.isNaN(status)) {
            return null;
        }
       else if (status < 10) {
        return status.toString().substring(0,3) + "%"
       }
       else if (status == 100) {
        return "100%"
       }
       else if (status == "0%") {
        return "0%"
       }
       else {
        return status.toString().substring(0,2) + "%"
       }
    }

    return (
        <>
        <p style={{
                color: "white", 
                fontFamily: "Poppins",
                fontSize: "0.75rem",
                zIndex: 0,
                textAlignVertical: "center",
                opacity: 1,
                marginRight: "1rem",
            }}>{chopStatus(status)}</p>
            
            <div style={{
            width: "100%",
            height: "100%",
            alignSelf: "center",
            bottom: 0,
            borderRadius: 5,
            overflow: "hidden",
            alignItems: "center",
            display: "flex",
            backgroundColor: "#1E2132",
            maxHeight: 60
        }}>
            <div style={{ width: status + "%", alignSelf: "flex-start",  height: "100%", backgroundColor: "#484F78"}}>
            </div>
        </div>
        </>
    )
}

export default Statusbar