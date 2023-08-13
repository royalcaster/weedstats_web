//React
import React, { useContext, useEffect, useRef } from "react";

//Third Party
import moment from "moment";
import { LanguageContext } from "../../data/LanguageContext";

const MemberSince = ({ backgroundColor, timestamp }) => {

    //Contexts
    const language = useContext(LanguageContext);

    var date = new Date(timestamp);

    var diff = new Date(Date.now() - date);
    var years = diff.getUTCFullYear() - 1970;
    var months = diff.getUTCMonth();
    var days = diff.getUTCDate() - 1;
    var final_string = "";

    if (years > 0) {
        if (language.language_short == "de") {
            if (years == 1) {
                final_string += years + " Jahr"
            }
            else {
                final_string += years + " Jahren"
            }
        }
        else {
            if (years == 1) {
                final_string += years + " year"
            }
            else {
                final_string += years + " years"
            }
        }
    }

    if (months > 0) {
        if (language.language_short == "de") {
            if (months == 1) {
                final_string += months + " Monat"
            }
            else {
                final_string += months + " Monaten"
            }
        }
        else {
            if (months == 1) {
                final_string += months + " month"
            }
            else {
                final_string += months + " months"
            }
        }
    }

    if (days > 0) {
        if (language.language_short == "de") {
            if (days == 1) {
                final_string += days + " Tag"
            }
            else {
                final_string += days + " Tagen"
            }
        }
        else {
            if (days == 1) {
                final_string += days + " day"
            }
            else {
                final_string += days + " days"
            }
        }
    }

    if (years == 0 && months == 0 && days == 0) {
        if (language.language_short == "de") {
            final_string = "heute";
        }
        else {
            final_string = "today";
        }
    }

    

    return (
        <div style={{width: "95%",
                    margin: "auto", 
                    borderRadius: 15,
                    backgroundColor: backgroundColor}}>
            <div style={styles.part}>
                <div style={{height: "0.5rem"}}></div>
                <p style={styles.text}>{language.account_member_since} {final_string}</p>
                <p style={styles.date}>{date.toLocaleDateString()}</p>
                <div style={{height: "0.5rem"}}></div>
            </div>
        </div>
    );
}

export default MemberSince

const styles = {
    container: {
        width: 300,
        alignSelf: "center",
        borderRadius: 15,
        padding: 10
    },
    part: {
        justifyContent: "center"
    },
    text: {
        color: "white",
        textAlign: "center",
        fontFamily: "Poppins"
    },
    date: {
        color: "#0080FF",
        textAlign: "center",
        fontFamily: "Poppins"
    }
};