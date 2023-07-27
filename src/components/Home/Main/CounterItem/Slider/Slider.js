//React
import React, { useEffect, useRef, useState } from "react";

//CSS
import './Slider.css'

const Template = ({ firstColor, secondColor, onToggleCounter }) => {

    const pan = useRef(new Animated.Value(0)).current;

    const SLIDER_WIDTH = responsiveWidth(20);
    const [containerWidth, setContainerWidth] = useState(0);

    const shrink = () => {
        Animated.timing(
            pan, {
                toValue: 0,
                useNativeDriver: true,
                duration: 500,
                easing: Easing.bezier(0, 1.02, 0.21, 0.97),
            }
        ).start();
    }

    //PanResponder test -> so funktionierts endlich, so ein dreck ehrlich
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => {
            Vibration.vibrate(25);
            return true;
        },
        onMoveShouldSetPanResponder: (event, gesture) => {
            return true;
        },
        onPanResponderMove: (event, gesture) => {
            if (gesture.dx > 0) {
                pan.setValue(gesture.dx);

                if (gesture.dx > (containerWidth - SLIDER_WIDTH)) {
                    pan.setValue(containerWidth - SLIDER_WIDTH);
                    onToggleCounter();
                    shrink();
                }

            }
            
        },
        onPanResponderRelease: (event, gesture) =>  {
            if (gesture.moveX > 0) {
                shrink();
            }
        }
    });

    return (
        <div style={[{
            flex: 1,
            height: 45,
            borderRadius: 5,
            marginBottom: 5
        }, {backgroundColor: secondColor}]} onLayout={(event) => {
            setContainerWidth(event.nativeEvent.layout.width);
          }}>
            <div style={{transform: [{translateX: pan}], justifyContent: "center", backgroundColor: "red", width: SLIDER_WIDTH, height: "100%", backgroundColor: firstColor, borderRadius: 5, flexDirection: "row", alignItems: "center"}} {...panResponder.panHandlers}>
                <div className="grab" style={{backgroundColor: secondColor, opacity: 0.25}}></div>
                <div className="grab" style={{backgroundColor: secondColor, opacity: 0.25}}></div>
                <div className="grab" style={{backgroundColor: secondColor, opacity: 0.25}}></div>
            </div>
        </div>
    );
}

export default Template