//React
import React, { useEffect, useRef } from "react";

const CustomModal = ({ show, child}) => {
    
    return (
        <>
            {show ? 
                <div style={styles.container}>
                    {child}
                </div>
            : null}
        </>
    );
}

export default CustomModal

const styles = {
    container: {
        height: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: 1000
    }
};