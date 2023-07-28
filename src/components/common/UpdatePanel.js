//React
import React, { useEffect, useRef, useState } from "react";

//Data
import News from "../../data/News";

//Custom Components
import Button from "./Button";

//Service
import { doc, updateDoc, getDoc, collection } from "@firebase/firestore";
import { app, firestore } from "../../data/FirebaseConfig";

import package_object from '../../../package.json'

const UpdatePanel = ({ language, onExit, refreshUser }) => {

    //State

    //Constants
    const app_version = package_object.version;

    const linkToPlayStore = () => {
        /* Linking.openURL('https://play.google.com/store/apps/details?id=com.royalcaster.WeedStats_build_test'); */
        console.log("Link in UpdatePanel.js definieren");
    }

    return (
        <div style={styles.container}>
            
        <div style={{backgroundColor: "#1E2132", height: "80%", width: "95%", borderRadius: 25}}>

        <div style={{flex: 1}}>
            <div style={{height: "2%"}}></div>
            <div style={styles.knob}></div>
            <div style={{height: "2%"}}></div>
            <p style={styles.heading}>Update available</p>
        </div>

        <div style={{flex: 1, width: "100%", alignSelf: "center"}}>
            <p style={[styles.text, {fontSize: "1.75rem", width: "80%", alignSelf: "center"}]}>Please update your app to the latest version to avoid errors and benefit from improvements and new features.</p>
        </div>

        <div style={{flex: 1}}>
            <Button title={"Go to PlayStore"} color={"#0781E1"} fontColor={"white"} onPress={() => linkToPlayStore()}/>
            <Button title={"Update later"} color={"#484F78"} fontColor={"white"} onPress={() => onExit()}/>
        </div>

        </div>
            
        </div>
    );
}

export default UpdatePanel

const styles = {
    container: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.75)",
        zIndex: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    knob: {
        width: "40%",
        height: 15,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        alignSelf: "center"
      },
    heading: {
        color: "white",
        fontSize: "3rem",
        fontFamily: "PoppinsBlack",
        marginLeft: 30
    },
    title: {
        color: "white",
        fontSize: "2rem",
        fontFamily: "PoppinsBlack",
        marginHorizontal: 20
    },
    text: {
        color: "white",
        fontSize: "1.5rem",
        fontFamily: "PoppinsMedium",
        marginHorizontal: 20
    }
};