//React
import React, { useEffect, useRef, useState } from "react";

//CSS
import './Slider.css'

const Template = ({ firstColor, secondColor, onToggleCounter }) => {

    /* const SLIDER_WIDTH = responsiveWidth(20); */
    const [containerWidth, setContainerWidth] = useState(0);

    const shrink = () => {
        
    }

    //PanResponder test -> so funktionierts endlich, so ein dreck ehrlich
    /* const panResponder = PanResponder.create({
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
    }); */

    return (
        <div style={[{
            flex: 1,
            height: 45,
            borderRadius: 5,
            marginBottom: 5
        }, {backgroundColor: secondColor}]} onLayout={(event) => {
            setContainerWidth(event.nativeEvent.layout.width);
          }}>
            <div style={{justifyContent: "center", backgroundColor: "red", width: "20px", height: "100%", backgroundColor: firstColor, borderRadius: 5, flexDirection: "row", alignItems: "center"}} >
                <div className="grab" style={{backgroundColor: secondColor, opacity: 0.25}}></div>
                <div className="grab" style={{backgroundColor: secondColor, opacity: 0.25}}></div>
                <div className="grab" style={{backgroundColor: secondColor, opacity: 0.25}}></div>
            </div>
        </div>
    );
}

export default Template