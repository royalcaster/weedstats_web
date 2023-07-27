//React
import React, { useEffect, useRef } from "react";

const CustomModal = ({ show, child}) => {

    const hide = () => {
        
    }
    
    return (
        <>
            {show ? 
                <div style={[styles.container]}>
                    {child}
                </div>
            : null}
        </>
    );
}

export default CustomModal

const styles = {
    container: {
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 10
    }
};