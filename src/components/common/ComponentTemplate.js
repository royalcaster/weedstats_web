//React
import React, { useEffect, useRef } from "react";

const Template = ({ onExit }) => {

    const slide = useRef(new Animated.Value(screen_height)).current;

    useEffect(() => {
        show();
    },[]);

    const show = () => {
        Animated.timing(slide,{
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 1, 0.21, 0.97),
        }).start()
    }

    const hide = () => {
        Animated.timing(slide,{
            toValue: screen_height,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 1, 0.21, 0.97),
        }).start(({finished}) => {
            finished ? onExit() : null;
        })
    }

    return (
        <Animated.View style={[styles.container,{transform:[{translateY: slide}]}]}>
            
        </Animated.View>
    );
}

export default Template

const styles ={
    container: {
        flex: 1,
        backgroundColor: "green"
    }
};