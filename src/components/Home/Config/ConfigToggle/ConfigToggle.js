//React
import React, { useEffect, useRef } from "react";
import TypeImage from "../../../common/TypeImage";

import Toggle from "react-toggle";
import "react-toggle/style.css" // for ES6 modules

import '../Config.css'

const ConfigToggle = ({ label, value, onPress, disabled, scrolling }) => {

    const toggleRef = useRef(null);

    return <>
    <div style={{height: "0.25rem"}}></div>
    <div style={styles.container} onClick={() => {if (!disabled) {onPress()}}}>
                <div style={styles.touchable}>
                    <div style={{flex: 5}}>
                        <p style={{fontFamily: "Poppins", fontSize: "1rem", color: "white", color: disabled ? "#484F78" : "white", marginLeft: "0.5rem"}}>{label}</p>
                    </div>
                    <div style={{flex: 1}}>
                        <Toggle
                            icons={false}
                            checked={disabled ? false : value}
                            readOnly={true}
                            ref={toggleRef}
                            disabled={disabled}
                            className='custom-classname'
                        />
                    </div>
                </div>
        </div>
        <div style={{height: "0.25rem"}}></div>
        </>
}

export default ConfigToggle

const styles = {
    container: {
        width: "95%",
        backgroundColor: "#131520",
        overflow: "hidden",
        borderRadius: 10,
        alignSelf: "center",
        margin: "auto",
        cursor: "pointer"
    },
    touchable: {
        flexDirection: "row",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    },
    label: {
        fontFamily: "Poppins",
        fontSize: "1.75rem",
        color: "white",
    }
};