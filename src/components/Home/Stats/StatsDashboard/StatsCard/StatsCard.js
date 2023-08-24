//React
import React from "react";

//Third-Party

const StatsCard = ({title, value}) => {

    return (
    <div style={styles.card_container}>
        <p style={styles.card_label}>{title}</p>
        <p style={[styles.card_value]}>
          {value}
        </p>
    </div>
    )
}

export default StatsCard

const styles = {
    card_container: {
        backgroundColor: "#131520",
        width: "30%",
        padding: 10,
        paddingLeft: 20,
        borderRadius: 10
      },
      card_label: {
        color: "white",
        fontFamily: "PoppinsLight",
        fontSize: 14,
        marginTop: 5,
        textAlign: "left",
      },
      card_value: {
        color: "white",
        fontFamily: "PoppinsBlack",
        fontSize: "2rem",
        marginTop: -5,
        textAlign: "left",
      }
};