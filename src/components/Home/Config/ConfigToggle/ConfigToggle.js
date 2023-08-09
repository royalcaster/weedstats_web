//React
import React, { useEffect, useRef } from "react";
import TypeImage from "../../../common/TypeImage";

import Toggle from "react-toggle";
import "react-toggle/style.css" // for ES6 modules

const ConfigToggle = ({ label, value, onPress, disabled, scrolling }) => {

    return <div style={styles.container}>
                <div style={styles.touchable}>
                    <div style={{flex: 5}}>
                        <p style={{fontFamily: "PoppinsMedium", fontSize: "1.75rem", color: "white", color: disabled ? "#484F78" : "white"}}>{label}</p>
                    </div>
                    <div style={{flex: 1}}>
                        <div style={{backgroundColor: "rgba(0,0,0,0)", height: 30, width: 50, position: "absolute", zIndex: 1000}}></div>
                        <Toggle
                        defaultChecked={value}
                        icons={false}
                        onChange={() => onPress()} />
                    </div>
                </div>
        </div>
}

export default ConfigToggle

const styles = {
    container: {
        width: "90%",
        backgroundColor: "#131520",
        overflow: "hidden",
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 2.5
    },
    touchable: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        fontFamily: "PoppinsMedium",
        fontSize: "1.75rem",
        color: "white"
    }
};