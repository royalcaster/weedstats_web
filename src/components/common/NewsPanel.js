//React
import React, { useEffect, useRef, useState } from "react";

//Data
import News from "../../data/News";

//Custom Components
import Button from "./Button";

import package_object from '../../../package.json'

//Service
import { doc, updateDoc, getDoc, collection } from "@firebase/firestore";
import { app, firestore } from "../../data/FirebaseConfig";

const NewsPanel = ({ language, onExit, refreshUser }) => {

    //State
    const [news, setNews] = useState([]);

    //Constants
    const app_version = package_object.version;

    useEffect(() => {
        loadNews();
    },[]);

    const loadNews = async () => {
        const docSnap = await getDoc(doc(firestore, "news", app_version));
        fillNews(docSnap.data());
    }

    const fillNews = (data) => {
        let news_buffer = []
        for (let i = 0; i < data.titles.length; i++) {
            news_buffer.push({
                title: data.titles[i],
                text: data.texts[i]
            })
        }
        setNews(news_buffer);
    }

    const setRead = async () => {
        refreshUser({
            news_read: true
        })
        onExit();
    }

    const renderNote = (note) => {
        return <div style={styles.note_container}>
            <p style={styles.title}>{note.title}</p>
            <p style={styles.text}>{note.text}</p>
        </div>
    }

    return (
        <div style={styles.container}>
            
        <div style={{backgroundColor: "#1E2132", height: "80%", width: "95%", borderRadius: 25}}>

        <div style={{flex: 1}}>
            <div style={{height: "2%"}}></div>
            <div style={styles.knob}></div>
            <div style={{height: "2%"}}></div>
            <p style={styles.heading}>What's new?</p>
            <div style={{height: "0.5%"}}></div>
            <p style={[styles.heading, {fontFamily: "PoppinsMedium", fontSize: "1.5rem"}]}>{app_version}</p>
        </div>

        <div style={{flex: 3, width: "100%", alignSelf: "center"}}>

        {
            news != null ?
                news.map((note) => {
                    return renderNote(note)
                })
            : null
        }

        </div>

        <div style={{flex: 1}}>
            <Button title={"Ok"} color={"#0781E1"} fontColor={"white"} onPress={() => setRead()}/>
        </div>

        </div>
            
        </div>
    );
}

export default NewsPanel

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
    note_container: {
        marginVertical: 10
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