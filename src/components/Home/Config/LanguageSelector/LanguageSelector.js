//React
import React, { useContext, useState } from "react";
import { LanguageContext } from "../../../../data/LanguageContext";
import Languages from '../../../../data/languages.json'

const LanguageSelector = ({ toggleLanguage, value }) => {

    return <div style={styles.container}>

        <div 
            onPress={() => {toggleLanguage("de")}}
            >
            <div style={{backgroundColor: value == "de" ? "#484F78" : "#131520",flexDirection: "row",}}>
                <img style={styles.language_image} source={require("../../../../data/img/de.png")}/>
            </div>
        </div>

        <div 
            onPress={() => {toggleLanguage("en")}}
            >
            <div style={{backgroundColor: value == "en" ? "#484F78" : "#131520",flexDirection: "row",}}>
                <div><img style={styles.language_image} source={require("../../../../data/img/gb.png")}/></div>
                <div><img style={styles.language_image} source={require("../../../../data/img/us.png")}/></div>
            </div>
        </div>

    </div>
}

export default LanguageSelector

const styles = {
    container: {
        width: "90%",
        borderRadius: 10,
        backgroundColor: "#131520",
        flexDirection: "row",
        alignSelf: "center",
        overflow: "hidden"
    },
    touchable: {
        flexDirection: "row",
    },
    language_image: {
        height: "3.5%",
        width: "12%",
        margin: 20,
        borderRadius: 3,
        alignSelf: "center"
    },
    touchable: {
        flex: 1
    }
};