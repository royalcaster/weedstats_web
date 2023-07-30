//React
import React from "react";

//THird Party
import { BiArrowBack } from 'react-icons/bi'

const BackButton = ({onPress}) => {
    return (
        <button onClick={() => onPress()} style={styles.touchable}><BiArrowBack style={styles.icon_back}/></button>
    );
}

export default BackButton

const styles = {  
    icon_back: {
        color: "white", 
        fontSize: 20, 
        padding: 15,
        textAlign: "center",
        textAlignVertical: "center"
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