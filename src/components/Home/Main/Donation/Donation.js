//React
import React, { useRef, useEffect, useContext } from 'react';

//Custom Components
import BackButton from '../../../common/BackButton';
import Button from '../../../common/Button';

//Third Party
import { LanguageContext } from '../../../../data/LanguageContext';

const Donation = ( { onexit } ) => {

    const language = useContext(LanguageContext)
    
    const hide = () => {
       
    }

    return (
        <div style={[{height: "100%"},styles.container]}>

            <div style={{ height: "5%" }}></div>

            <div style={{flexDirection: "row", maxHeight: 60, alignItems: "center"}}>
                <div style={{marginLeft: 20, justifyContent: "center"}}>
                    <BackButton onPress={() => hide()}/>
                </div>
                <div >
                    <p style={styles.heading}>{language.account_support_weedstats}</p>
                </div>
            </div>

            <div style={{width: "80%", alignSelf: "center"}}>

                <div style={{ height: "4%"}}></div>

                <p style={[styles.bold]}>{language.account_support_catch}</p>

                <p style={[styles.text]}>{language.account_support_text}{"\n"}</p>
            
                {language.account_support_features.map((feature) => {
                    return <p style={styles.feature} key={Math.random()}>{feature}</p>
                })}

                <div style={{ height: "4%"}}></div>
            </div>

            <Button title={language.account_support_go_premium + " (COMING SOON)"} color={"#F2338C"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.5)"} disabled={true}/>

        </div>
    )
}

export default Donation

const styles = {
    container: {
        width: "100%",
        backgroundColor: "#131520",
        flexDirection: "column",
        flex: 1,
        position: "absolute",
        zIndex: 5,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    text: {
        fontFamily: "PoppinsLight",
        fontSize: "2rem",
        color: "white",
    },
    feature: {
        fontFamily: "PoppinsLight",
        fontSize: "2rem",
        color: "white",
        backgroundColor: "#1E2132",
        borderRadius: 10,
        margin: 5,
        padding: 15,
    },
    bold: {
        fontFamily: "PoppinsBlack",
        fontSize: "3rem",
        color: "#F2338C",
    },
    heading: {
        color: "white",
        fontSize: 20,
        fontFamily: "PoppinsMedium",
        marginLeft: 20,
        marginTop:5
      },
};