//React
import React from "react";


const MenuButton = ({type, url, icon, color, borderradius, onPress, disabled}) => {
        
    

    return (
      <div onClick={onPress} style={{backgroundColor: "green", borderRadius: borderradius, width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flex: 1,
        padding: 0,
        backgroundColor: "#484F78",
        cursor: "pointer"}}>
      {icon}
    </div>
    );
}

export default MenuButton