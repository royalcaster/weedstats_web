import React, {useState} from "react";

const IconButton = ({icon, onPress, backgroundColor, hoverColor }) => {

    const [hover, setHover ] = useState(false);

    return (
        <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
            height: "100%",
            width: "100%",
            padding: 20,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center", 
            backgroundColor: hover ? hoverColor : backgroundColor,
            borderWidth: 0,
        }} onPaste={() => onPress()}></button>
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