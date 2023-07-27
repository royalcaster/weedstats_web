//React
import React from "react";

const BackButton = ({onPress}) => {
    return (
        <button onClick={() => onPress()} style={styles.touchable}>Back</button>
    );
}

export default BackButton

const styles = {  
    icon_back: {
        color: "rgba(255,255,255,0.75)", 
        fontSize: 20, 
        padding: 15,
        textAlign: "center",
        textAlignVertical: "center"
    },
    touchable: {
        width: 50,
        height: 50,
        backgroundColor: "rgba(0,0,0,0.0)",
        borderRadius: 25
    }
};