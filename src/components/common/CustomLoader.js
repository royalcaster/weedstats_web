//React
import React, {useEffect, useRef } from "react";
import { Spinner } from "react-activity";

const CustomLoader = ({ x, color, special }) => {

    return (
        <Spinner size={x} color={color} />
    );
}

export default CustomLoader