import React, {useState} from "react";

const IconButton = ({x, icon, onPress, backgroundColor, hoverColor }) => {

    const [hover, setHover ] = useState(false);

    return (
        <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
            height: x,
            width: x,
            padding: 20,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center", 
            backgroundColor: hover ? hoverColor : backgroundColor,
            borderWidth: 0,
            cursor: "pointer"
        }} onClick={() => onPress()}>{icon}</div>
    );
}

export default IconButton

const styles = {
    container: {
        borderRadius: 100,
        height: 60,
        width: 60
    }
};