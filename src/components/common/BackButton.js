//React
import React from "react";
import { useState } from "react";

//THird Party
import { BiArrowBack } from 'react-icons/bi'

import './Button.css'

const BackButton = ({onPress, hoverColor}) => {

    const [hover, setHover] = useState(false);

    return (
            <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                height: 30,
                width: 30,
                padding: 10,
                borderRadius: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center", 
                backgroundColor: hover ? hoverColor : "rgba(0,0,0,0)",
                borderWidth: 0,
                cursor: "pointer"
            }} onClick={() => onPress()}><BiArrowBack style={styles.icon_back}/></div>
    );
}

export default BackButton

const styles = {  
    icon_back: {
        color: "white", 
        fontSize: 20, 
        textAlign: "center",
        textAlignVertical: "center",
        margin: 0,
        padding: 0
    },
    touchable: {
        width: 50,
        height: 50,
        backgroundColor: "rgba(0,0,0,0.0)",
        borderRadius: 25,
        outline: "none",
        borderWidth: 0,
        justifyContent: "center"
    }
};