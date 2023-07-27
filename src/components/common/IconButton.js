import React from "react";

const IconButton = ({icon, onPress, backgroundColor }) => {
    return (
        <button style={[styles.touchable, {backgroundColor: backgroundColor}]} onPaste={() => onPress()}></button>
    );
}

export default IconButton

const styles = {
    container: {
        borderRadius: 100,
        height: 60,
        width: 60
    },
    touchable: {
        height: "100%",
        width: "100%",
        padding: 20,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
    }
};