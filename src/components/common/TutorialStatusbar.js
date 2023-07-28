import React from "react";

const TutorialStatusbar = ({ status }) => {
    return <View style={styles.container}>
        <Animated.View style={[styles.status,{left: "500px",width: "100%", transform: [{translateX: status}]}]}></Animated.View>
        <LinearGradient colors={["#1E2132","#0781E1"]} style={styles.blur} start={{ x: 1, y: 1 }}></LinearGradient>
    </View>
}

export default TutorialStatusbar

const styles = {
    container: {
        width: "100%",
        backgroundColor: "#1E2132",
        height: 30,
        position: "absolute",
        zIndex: 20000,
        bottom: 0,
        flexDirection: "row"
    },
    status: {
        backgroundColor: "#0781E1",
        height: "100%",
    },
    blur: {
        backgroundColor: "green",
        width: 30,
        height: "100%",
    }
};