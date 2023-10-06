//React
import React from "react";

//Custom Components
import TypeImage from "./TypeImage";

//Service
import { uuidv4 } from "@firebase/util";


const SelectorBar = ({ options, onPress, selectedType }) => {

    const getTypeString = (x) => {
        switch(x){
            case 0: return "main"
            case 1: return "joint";
            case 2: return "bong";
            case 3: return "vape"; 
            case 4: return "pipe";
            case 5: return "cookie";
            case 6: return 0;
            case 7: return 7;
            case 8: return 30;
            case 9: return 365;
        }
    }

    return (
            <div style={styles.container}>
                {options.map((option) => {
                    return (
                        <div onClick={() => onPress(option.value)}>
                            <div style={{
                                    backgroundColor: selectedType == getTypeString(option.value) ? "#0080FF" : "rgba(0,0,0,0)",
                                    padding: 5,
                                    paddingHorizontal: 25,
                                    paddingVertical: 10,
                                    borderRadius: 100,
                                    justifyContent: "center"}}>
                                {option.value > 0 && option.value < 6 ? <TypeImage type={getTypeString(option.value)} x={20}/> : <p style={styles.item_label}>{option.label}</p>}
                            </div>
                        </div>
                    )
                })}
            </div>
    );
}

export default SelectorBar

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#131520",
        borderRadius: 10
    },
    item_container: {
        backgroundColor: "#131520",
        padding: 5,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 100,
        justifyContent: "center"
    },
    item_label: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: "1.5rem",
        textAlignVertical: "center"
    }
};