//React
import React, { useRef, useEffect, useContext } from 'react';

//Custom Components
import BackButton from '../../../common/BackButton';
import Button from '../../../common/Button';

//Third Party
import { LanguageContext } from '../../../../data/LanguageContext';

const Donation = ( { onExit } ) => {

    const language = useContext(LanguageContext)

    return (
        <div style={styles.container}>

            <div style={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                <div style={{marginLeft: "1rem"}}>
                    <BackButton onPress={() => onExit()} hoverColor={"rgba(255,255,255,0.25)"}/>
                </div>
                <div style={{width: "1rem"}}></div>
                <div>
                <p style={styles.heading}>WeedStats Premium</p>
                </div>
            </div>

            <div style={{width: "100%", alignSelf: "center", display: "block", margin: "auto", width: "90%"}}>

                <p style={styles.bold}>{language.account_support_catch}</p>

                <p style={styles.text}>{language.account_support_text}</p>
            
                {language.account_support_features.map((feature) => {
                    return <p style={styles.feature} key={Math.random()}>{feature}</p>
                })}

                <div style={{ height: "1rem"}}></div>
            </div>

            <div style={{display: "block", margin: "auto", width: "90%"}}>
                <Button title={language.account_support_go_premium + " (COMING SOON)"} borderradius={10} color={"#F2338C"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.5)"} disabled={true}/>
            </div>
        </div>
    )
}

export default Donation

const styles = {
    container: {
        position: "absolute",
        height: "100%",
        width: "100%",
        maxWidth: 700,
        overflowY: "scroll",
        overflowX: "hidden",
        zIndex: 1000,
        backgroundColor: "#1E2132"
    },
    text: {
        fontFamily: "Poppins",
        fontSize: "1rem",
        color: "white",
    },
    feature: {
        fontFamily: "Poppins",
        fontSize: "1rem",
        color: "white",
        backgroundColor: "#131520",
        borderRadius: 10,
        margin: 5,
        padding: 15,
    },
    bold: {
        fontFamily: "Poppins",
        fontSize: "2rem",
        color: "#F2338C",
        fontWeight: 700
    },
    heading: {
        color: "white",
        fontSize: "1.5rem",
        fontFamily: "Poppins",
        textAlign: "left",
      },
};