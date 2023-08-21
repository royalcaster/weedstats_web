//React
import React, { useContext, useState } from "react";
import { LanguageContext } from "../../../../data/LanguageContext";
import Languages from '../../../../data/languages.json'

const LanguageSelector = ({ toggleLanguage, value }) => {

    return <div style={styles.container}>

        <div onClick={() => {toggleLanguage("de")}} style={styles.button}>
            <div style={{backgroundColor: value == "de" ? "#484F78" : "#131520",flexDirection: "row", display: "flex", justifyContent: "center"}}>
                <div><img style={styles.language_image} src={require("../../../../data/img/de.png")}/></div>
            </div>
        </div>

        <div onClick={() => {toggleLanguage("en")}} style={styles.button}>
            <div style={{backgroundColor: value == "en" ? "#484F78" : "#131520",flexDirection: "row", display: "flex", justifyContent: "center"}}>
                <div><img style={styles.language_image} src={require("../../../../data/img/gb.png")}/></div>
                <div><img style={styles.language_image} src={require("../../../../data/img/us.png")}/></div>
            </div>
        </div>

    </div>
}

export default LanguageSelector

const styles = {
    container: {
        width: "95%",
        borderRadius: 10,
        backgroundColor: "#131520",
        flexDirection: "row",
        alignSelf: "center",
        overflow: "hidden",
        margin: "auto",
        display: "flex",
        cursor: "pointer"
    },
    touchable: {
        flexDirection: "row",
    },
    language_image: {
        height: "3rem",
        width: "5rem",
        margin: 20,
        borderRadius: 3,
        alignSelf: "center"
    },
    button: {
        height: "100%",
        width: "100%"
    }
};