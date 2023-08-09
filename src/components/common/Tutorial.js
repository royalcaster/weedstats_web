//React
import React, { useContext, useEffect, useRef, useState } from "react";

//Custom Components
import BackButton from "./BackButton";
import Button from "./Button";
import IconButton from '../common/IconButton'

//Konstanten
import Levels from '../../data/Levels.json'
import { LanguageContext } from "../../data/LanguageContext";


const Tutorial = ({ onExit, type }) => {

  //Context
  const language = useContext(LanguageContext);

  //State
  const [consented, setConsented] = useState(false);

  const RenderItem = ( item ) => {
    return (
      <div style={{width: "100%", justifyContent: "center", flexDirection: "column", bottom: 0, overflow: "hidden", backgrounColor: item.backgroundColor}}>
        {item.testComponent ? item.testComponent : null}
      </div>
    );
  }

  const titleScreen = () => {
    return <>
    <div style={styles.testComponentContainer}>
      <div style={{height: "2rem"}}></div>
      <div style={{flex: 1, justifyContent: "center"}}>
        <img style={{height: "4rem", width: "4rem", borderRadius: 15, display: "block", margin: "auto"}} src={require('../../data/img/icon.png')}/>
        <p style={styles.logo_heading}>WeedStats</p>
        <p style={styles.logo_heading2}>Tutorial</p>
      </div>
      <div style={{height: "2rem"}}></div>
      <p style={styles.text}><img style={styles.small_logo} src={require("../../data/img/icon.png")}/> <span style={{fontWeight: 700}}>WeedStats</span> bietet verschiedenste Möglichkeiten zum <span style={{color: Levels[0].colors[0]}}>Erfassen</span>, <span style={{color: Levels[2].colors[0]}}>Auswerten</span> und <span style={{color: Levels[6].colors[0]}}>Teilen</span> deines Gras-Konsums. {"\n"}Diese kurze Tour wird dir die wesentlichen Funktionen der App beibringen.</p>
      <div style={{height: "1rem"}}></div>
      <p style={styles.swipe_up_text}>{language.tutorial_are_you_ready}</p>
      <div style={{height: "2rem"}}></div>
    </div>
    </>
  }
      
  const counterScreen = () => {
    return <div style={styles.screen_container}>
      <p style={styles.title2}>{language.tutorial_counter_title}</p>
      <p style={styles.text2}>{language.tutorial_counter_text}</p>
      <div style={{height: "2rem"}}></div>
      <img src={require('../../data/img/tutorial/counter.png')} style={styles.screenshot} />
    </div>
  }

  const statsScreen = () => {
    return <div style={styles.screen_container}>
      <p style={styles.title2}>{language.tutorial_stats_title}</p>
      <p style={styles.text2}>{language.tutorial_stats_text}</p>
      <div style={{height: "2rem"}}></div>
      <img src={require('../../data/img/tutorial/stats.png')} style={styles.screenshot} />
    </div>
  }

  const mapScreen = () => {
    return <div style={styles.screen_container}>
      <p style={styles.title2}>{language.tutorial_map_title}</p>
      <p style={styles.text2}>{language.tutorial_map_text}</p>
      <div style={{height: "2rem"}}></div>
      <img src={require('../../data/img/tutorial/map.png')} style={styles.screenshot} />
    </div>
  }

  const configScreen = () => {
    return <div style={styles.screen_container}>
      <p style={styles.title2}>{language.tutorial_config_title}</p>
      <p style={styles.text2}>{language.tutorial_config_text}</p>
      <div style={{height: "2rem"}}></div>
      <img src={require('../../data/img/tutorial/config.png')} style={styles.screenshot} />
    </div>
  }

  const friendsScreen = () => {
    return <div style={styles.screen_container}>
      <p style={styles.title2}>{language.tutorial_friends_title}</p>
      <p style={styles.text2}>{language.tutorial_friends_text}</p>
      <div style={{height: "2rem"}}></div>
      <img src={require('../../data/img/tutorial/friends.png')} style={styles.screenshot} />
    </div>
  }

  const tippScreen = () => {
    return <div style={styles.screen_container}>
      <p style={{color: "#0781E1", fontWeight: 700, fontSize: "1.5rem"}}>{language.tutorial_tipp_title}</p>
      <p style={styles.text2}>{"\n"}{"\n"}{language.tutorial_tipp_text}</p>
      <div style={{height: "2rem"}}></div>
      {type != "first" ? <>
      <Button title={"Ok"} fontColor={"white"} color={"#0781E1"} hovercolor={"#0782e1c9"} onPress={() => {onExit()}} borderradius={10}/>
      <div style={{height: "1rem"}}></div></> : null}
    </div>
  }

  const warningScreen = () => {
    return <div style={styles.screen_container2}>

        <p style={styles.title2}>{language.tutorial_pls_read_title}</p>
        <p style={styles.text2}>{language.tutorial_pls_read_text}<br/><br/></p>
        <p style={styles.text2}>{language.tutorial_pls_read_text2}<br/><br/></p>
        <p style={styles.text2}>{language.tutorial_pls_read_text3}<br/><br/></p>
        <p style={styles.text2}>{language.tutorial_pls_read_text4}</p>

      </div>
  }

  const warningScreen2 = () => {
    return <div style={styles.screen_container3}>

        <p style={styles.title2}>{language.short == "de" ? "Eine Sache noch..." : "One last thing..."}</p>
        <p style={styles.text2}>{language.short == "de" ? "Bitte lies aufmerksam unsere Datenschutzbestimmung." : "Please carefully read our data policy."}</p>

        <div style={{height: "2rem"}}></div>

        {/* TODO: Link zu Data Policy einfügen */}
        <Button borderradius={10} title={language.tutorial_show_policy} color={"#131520"} hovercolor={"#1E2132"} fontColor={"white"} onPress={() => console.log("onPress in Tutorial definieren!")}/>

        <div style={{height: "1rem"}}></div>
          <div style={{display: "block", margin: "auto", display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center"}}>
            <input style={{height: "1rem", width: "1rem"}} type="checkbox" id="policy" name="policy" value="Policy" onChange={() => setConsented(!consented)} />
            <label for="policy" style={{fontSize: "1rem", marginTop: 0, marginLeft: 10}}>{language.tutorial_consent}</label>
          </div>
        <div style={{height: "1rem"}}></div>

        {consented ?
        <Button title={language.tutorial_get_started} fontColor={"#1E2132"} color={"white"} hovercolor={"rgba(255,255,255,0.8)"} onPress={() => { onExit()}} borderradius={10}/>
        :
        <Button title={language.tutorial_get_started} fontColor={"#1E2132"} color={"rgba(160,160,160,1)"} hovercolor={"rgba(160,160,160,1)"} borderradius={10} onPress={() => alert(language.tutorial_consent_alert)}/>
        }
        <div style={{height: "1rem"}}></div>
      </div>
  }

    //Wenn App fertig, dann Videos für Tutorial aufnehmen -> Expo Video
    const slides = [
      {
        key: '-one',
        testComponent: titleScreen(), 
        backgroundColor: "#1E2132"
      },
      {
        key: 'one',
        testComponent: counterScreen(),
        backgroundColor: "#1E2132"
      },
      {
        key: 'two',
        testComponent: statsScreen(),
        backgroundColor: "#131520"
      },
      {
        key: 'three',
        testComponent: mapScreen(),
        backgroundColor: "#1E2132"
      },
      {
        key: 'four',
        testComponent: configScreen(),
        backgroundColor: "#131520"
      },
      {
        key: 'five',
        testComponent: friendsScreen(),
        backgroundColor: "#1E2132"
      },
      {
        key: 'six',
        testComponent: tippScreen(),
        backgroundColor: "#131520"
      },
    ];

    const adjustSlides = () => {
      if (type == "first") {
        slides.push({
          key: 'seven',
          testComponent: warningScreen(),
          backgroundColor: "#FC2044"
        },
        {
          key: 'eight',
          testComponent: warningScreen2(),
          backgroundColor: "#FC2044"
        }
        )
      }
    }

    adjustSlides()

    return (
      <div style={styles.container}>

          {type != 'first' ? <div style={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                <div style={{marginLeft: "1rem"}}>
                    <BackButton onPress={() => onExit()} hoverColor={"rgba(255,255,255,0.25)"}/>
                </div>
                <div style={{width: "1rem"}}></div>
                <div>
                <p style={styles.navigation_heading}>Tutorial</p>
                </div>
            </div> : null}

          <div style={{height: "2rem"}}></div>

          <div style={{width: "90%", margin: "auto"}}>
            {slides.map((slide) => {
              return RenderItem(slide);
            })}
          </div>
 
      </div>
  );
}

export default Tutorial

const styles = {
    container: {
        backgroundColor: "#1E2132",
        height: "100%",
        width: "100%",
        position: "absolute",
        maxWidth: 700,
        overflow: "scroll"
    },
    logo_heading: {
      fontFamily: "Poppins",
      fontSize: 30,
      color: "white",
      textAlign: "center",
      fontWeight: 700,
      margin: 0
    },
    map: {
      width: "100%",
      backgroundColor: "#171717",
      height: "20%",
      position: "absolute",
      bottom: 0
    },
    heading: {
      fontFamily: "Poppins",
      color: "white",
      fontSize: "2.3rem",
      marginLeft: 30,
      position: "relative",
      fontWeight: 700,
      textAlign: "center"
    },
    logo_heading2: {
      fontFamily: "Poppins",
      color: "white",
      fontSize: "1.5rem",
      position: "relative",
      color: "#F2338C",
      position: "relative",
      fontWeight: 700,
      textAlign: "center",
      margin: 0
    },
    icon: {
      color: "white",
      fontSize: "4rem",
      textAlignVertical: "center",
      marginRight: 5,
      marginTop: -5
    },
    testComponentContainer: {
      width: "100%",
      display: "block",
      margin: "auto",
      backgroundColor: "#131520",
      borderRadius: 15
    },
    swipe_up_text: {
      color: "#0781E1",
      fontSize: "1rem",
      fontFamily: "Poppins",
      letterSpacing: 5,
      alignSelf: "center",
      fontWeight: 500,
      textAlign: "center"
    },
    fingerprint: {
      color: "#0781E1",
      fontSize: "7.5rem"
    },
    title: {
      color: "#0781E1",
      textAlign: "left",
      fontFamily: "Poppins",
      fontSize: "5rem",
      marginHorizontal: "10%",
      fontWeight: 700,
      margin: 0
    },
    text: {
      color: "white",
      textAlign: "left",
      fontFamily: "Poppins",
      fontSize: "1.5rem",
      marginHorizontal: "15%",
      width: "90%",
      margin: "auto"
    },
    small_logo: {
      width: "2.5rem",
      height: "2.5rem",
      marginBottom: -10
    },
    title2: {
      color: "white",
      textAlign: "left",
      fontFamily: "Poppins",
      fontSize: "1.5rem",
      fontWeight: 700,
      margin: 0
    },
    text2: {
      color: "white",
      textAlign: "left",
      fontFamily: "Poppins",
      fontSize: "1rem",
      marginHorizontal: "10%",
      margin: 0
    },
    touchable: {
      width: "100%",
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 30,
      paddingVertical: 20,
      justifyContent: "center"
    },
    policy_text: {
      color: "white",
      fontFamily: "PoppinsBlack",
      fontSize: "2rem",
    },
    check_icon: {
      color: "white",
      fontSize: "3rem"
    },
    screenshot: {
      height: "30rem",
      resizeMode: "contain",
      alignSelf: "center",
      display: "block",
      margin: "auto",
      borderRadius: 15
    },
    navigation_heading: {
      color: "white",
      fontSize: "1.5rem",
      fontFamily: "Poppins",
      textAlign: "left"
    },
    screen_container: {
      backgroundColor: "#131520",
      borderRadius: 15,
      padding: "2rem",
      marginBottom: "2rem",
      marginTop: "2rem"
    },
    screen_container2: {
      backgroundColor: "#FC2044",
      borderRadius: 15,
      padding: "2rem",
      marginBottom: "2rem",
      marginTop: "2rem"
    },
    screen_container3: {
      backgroundColor: "#0080FF",
      borderRadius: 15,
      padding: "2rem",
      marginBottom: "2rem",
      marginTop: "2rem"
    },
    checkbox: {
      textAlign: "center",
      backgroundColor: "green"
    }
};