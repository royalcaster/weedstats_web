//React
import React, { useEffect, useRef, useState } from "react";

//CSS
import './Slider.css'
import Button from "../../../../common/Button";

//THird PArty
import { GiLighter } from 'react-icons/gi'

const Template = ({ firstColor, secondColor, onToggleCounter }) => {

    /* const SLIDER_WIDTH = responsiveWidth(20); */
    const [containerWidth, setContainerWidth] = useState(0);

    const shrink = () => {
        
    }

    const button_style = {
        color: "white",
        backgroundColor: firstColor,
        outline: "none",
        borderWidth: 0
    }

    return (
        <Button title={"rauchen"} borderradius={10} color={firstColor} hovercolor={secondColor} fontColor={"white"} onPress={() => onToggleCounter()} icon={<GiLighter style={{marginBottom: -5, fontSize: "1.5rem"}}/>}/>
    );
}

export default Template