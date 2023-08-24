//React
import React from "react";

//Third-Party
import moment from "moment";

const StateBar = ({ type, value, activeLastDay }) => {

    const today = moment(new Date(), "YYYY-MM-DD HH:mm:ss")
    today.locale("de");

    if (type=="streak") {
        return (
            <div style={styles.container}>

               <div style={styles.div}>
                    <div style={styles.image_container}>
                        {value > 3 ? <img style={{height: 20, width: 20}} src={require('../../../../../data/img/logo.png')}/>
                         : <img style={{height: 20, width: 20}} src={require('../../../../../data/img/logo_bw.png')}/>}
                        
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(-2).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
              
                <div style={styles.div}>
                    <div style={styles.image_container}>
                        {value > 2 ? <img style={{height: 20, width: 20}} src={require('../../../../../data/img/logo.png')}/>
                         : <img style={{height: 20, width: 20}} src={require('../../../../../data/img/logo_bw.png')}/>}
                        
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(-1).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
                <div style={styles.div}>
                    <div style={styles.image_container}>
                        {value > 1 ? <img style={{height: 20, width: 20}} src={require('../../../../../data/img/logo.png')}/> 
                        : <img style={{height: 20, width: 20}} src={require('../../../../../data/img/logo_bw.png')}/>}
                        
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(0).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
                <div style={styles.div_selected}>
                    <div style={styles.image_container}>
                        <img style={{height: 20, width: 20}} src={require('../../../../../data/img/logo.png')}/>
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(1).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
                <div style={styles.div}>
                    <div style={styles.image_container}>
                        <img style={{height: 20, width: 20}} src={require('../../../../../data/img/logo_bw.png')}/>
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(2).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
                <div style={styles.div}>
                    <div style={styles.image_container}>
                        <img style={{height: 20, width: 20}} src={require('../../../../../data/img/logo_bw.png')}/>
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(3).format("dddd").substring(0,2)}</p>
                    </div>
                </div>

                <div style={styles.div}>
                    <div style={styles.image_container}>
                        <img style={{height: 20, width: 20}} src={require('../../../../../data/img/logo_bw.png')}/>
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(4).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
            </div>
        );
    }
    else if (type=="break") {
        return (
            <div style={styles.container}>

                <div style={styles.div}>
                    <div style={styles.image_container}>
                        {/* <AntDesign name="closecircleo" style={[styles.close_icon,{color: value > 2 ? "#eb4034" : "#484F78"}]}/> */}
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(-2).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
                <div style={styles.div}>
                    <div style={styles.image_container}>
                        {/* <AntDesign name="closecircleo" style={[styles.close_icon,{color: value > 1 ? "#eb4034" : "#484F78"}]}/> */}
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(-1).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
                <div style={styles.div}>
                    <div style={styles.image_container}>
                        {/* <AntDesign name="closecircleo" style={[styles.close_icon,{color: value > 0 ? "#eb4034" : "#484F78"}]}/> */}
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(0).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
                <div style={[styles.div, styles.div_selected]}>
                    <div style={styles.image_container}>
                        {/* <AntDesign name="closecircleo" style={[styles.close_icon,{color: !activeLastDay ? "#eb4034" : "#484F78"}]}/> */}
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(1).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
                <div style={styles.div}>
                    <div style={styles.image_container}>
                        {/* <AntDesign name="closecircleo" style={[styles.close_icon,{color: "#484F78"}]}/> */}
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(2).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
                <div style={styles.div}>
                    <div style={styles.image_container}>
                        {/* <AntDesign name="closecircleo" style={[styles.close_icon,{color: "#484F78"}]}/> */}
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(3).format("dddd").substring(0,2)}</p>
                    </div>
                </div>

                <div style={styles.div}>
                    <div style={styles.image_container}>
                        {/* <AntDesign name="closecircleo" style={[styles.close_icon,{color: "#484F78"}]}/> */}
                    </div>
                    <div style={styles.day_container}>
                        <p style={styles.day}>{today.day(4).format("dddd").substring(0,2)}</p>
                    </div>
                </div>
    
            </div>
        );
    }
    else {
        return null;
    }


    
}

export default StateBar

const styles = {
    container: {
        width: "100%",
        flexDirection: "row",
        height: 40
    },
    div: {
        flex: 1,
        flexDirection: "column"
    },
    div_selected: {
        backgroundColor: "#1E2132",
        borderRadius: 4
    },
    image_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 3
    },
    day_container: {
        flex: 1,
    },
    day: {
        color: "white",
        textAlign: "center",
        fontFamily: "PoppinsBlack",
        fontSize: 10,
        textAlignVertical: "center"
    },
    close_icon: {
        fontSize: 13,
        textAlign: "center",
        textAlignVertical: "center"
    }
};
