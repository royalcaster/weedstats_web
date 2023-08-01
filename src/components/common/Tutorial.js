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
      <div style={{width: "100%", justifyContent: "center", flexDirection: "column", bottom: 0, borderRadius: 25, overflow: "hidden", backgrounColor: item.backgroundColor}}>
        {item.testComponent ? item.testComponent : null}
      </div>
    );
  }

  const titleScreen = () => {
    return <>
    <div style={styles.testComponentContainer}>
      <div style={{flex: 1, justifyContent: "center"}}>
        <img style={{height: "4rem", width: "4rem", borderRadius: 15, display: "block", margin: "auto"}} src={require('../../data/img/icon.png')}/>
        <p style={styles.logo_heading}>WeedStats</p>
        <p style={styles.logo_heading2}>Tutorial</p>
      </div>
      <div style={{height: "2rem"}}></div>
      <p style={styles.swipe_up_text}>{language.tutorial_swipe_text}</p>
    </div>
    </>
  }

  const welcomeScreen = () => {
    return <div>
    {/* <div style={{height: "10%"}}></div> */}
    <p style={styles.text}><img style={styles.small_logo} src={require("../../data/img/icon.png")}/> WeedStats bietet verschiedenste Möglichkeiten zum <p style={{color: Levels[0].colors[0]}}>Erfassen</p>, <p style={{color: Levels[2].colors[0]}}>Auswerten</p> und <p style={{color: Levels[6].colors[0]}}>Teilen</p> deines Gras-Konsums. {"\n"}Diese kurze Tour wird dir die wesentlichen Funktionen der App beibringen.</p>
    <div style={{height: "10%"}}></div>
    <p style={styles.swipe_up_text}>{language.tutorial_are_you_ready}</p>
    
    </div>
  }
      
  const counterScreen = () => {
    return <>
      <p style={styles.title2}>{language.tutorial_counter_title}</p>
      <p style={styles.text2}>{language.tutorial_counter_text}</p>
      <div style={{height: "5%"}}></div>
      <img src={require('../../data/img/tutorial/counter.png')} style={styles.screenshot} />
    </>
  }

  const statsScreen = () => {
    return <div>
      <p style={styles.title2}>{language.tutorial_stats_title}</p>
      <p style={styles.text2}>{language.tutorial_stats_text}</p>
      <div style={{height: "5%"}}></div>

      <img src={require('../../data/img/tutorial/stats.png')} style={styles.screenshot} />
    </div>
  }

  const mapScreen = () => {
    return <div style={{height: "100%", width: "100%", borderRadius: 10, overflow: "hidden"}}>
      <p style={styles.title2}>{language.tutorial_map_title}</p>
      <p style={styles.text2}>{language.tutorial_map_text}</p>
      <div style={{height: "5%"}}></div>
      <img src={require('../../data/img/tutorial/map.png')} style={styles.screenshot} />
    </div>
  }

  const configScreen = () => {
    return <div>
      <p style={styles.title2}>{language.tutorial_config_title}</p>
      <p style={styles.text2}>{language.tutorial_config_text}</p>
      <div style={{height: "5%"}}></div>
      <img src={require('../../data/img/tutorial/config.png')} style={styles.screenshot} />
    </div>
  }

  const friendsScreen = () => {
    return <div>
      <p style={styles.title2}>{language.tutorial_friends_title}</p>
      <p style={styles.text2}>{language.tutorial_friends_text}</p>
      <div style={{height: "5%"}}></div>
      <img src={require('../../data/img/tutorial/friends.png')} style={styles.screenshot} />
    </div>
  }

  const tippScreen = () => {
    return <div style={{width: "100%", alignSelf: "center"}}>
      <p style={styles.text}><p style={{color: "#0781E1"}}>{language.tutorial_tipp_title}</p>{"\n"}{"\n"}{language.tutorial_tipp_text}</p>
    </div>
  }

  const warningScreen = () => {
    return <div style={{width: "100%", alignSelf: "center"}}>

        <p style={styles.title2}>{language.tutorial_pls_read_title}</p>
        <p style={styles.text2}>{language.tutorial_pls_read_text}</p>

      </div>
  }

  const warningScreen2 = () => {
    return <div style={{width: "100%", alignSelf: "center"}}>

        <p style={styles.text2}>{language.tutorial_pls_read_text2}</p>

        <div style={{height: "5%"}}></div>
        <Button title={language.tutorial_show_policy} color={"#1E2132"} hovercolor={"rgba(255,255,255,0.25)"} fontColor={"white"} onPress={() => console.log("onPress in Tutorial definieren!")}/>

        // TODO: Touchable in Tutorial ersetzen
        {/* <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", false)} onPress={() => {setConsented(!consented)}}>
          <div style={styles.touchable}>
            {consented ? 
            <MaterialIcons name={"check-box"} style={styles.check_icon}/>
            : 
            <MaterialIcons name={"check-box-outline-blank"} style={styles.check_icon}/>
            }
            <div style={{width: "5%"}}></div>
            <p style={styles.policy_text}>{language.tutorial_consent}</p>
          </div>
        </TouchableNativeFeedback> */}

        <div style={{height: "5%"}}></div>

        {consented ?
        <Button title={language.tutorial_get_started} fontColor={"#1E2132"} color={"white"} color2={"#1E2132"} hovercolor={"rgba(0,0,0,0.25)"} onPress={() => { onExit()}}/>
        :
        <Button title={language.tutorial_get_started} fontColor={"#1E2132"} color={"rgba(160,160,160,1)"} color2={"#1E2132"} hovercolor={"rgba(160,160,160,1)"} onPress={() => alert(language.tutorial_consent_alert)}/>
        }
      </div>
  }


  const readyScreen = () => {
    return <div style={{width: "100%", alignSelf: "center"}}>

        <Button title={"Ok"} fontColor={"white"} color={"#0781E1"} color2={"#484F78"} hovercolor={"rgba(0,0,0,0.25)"} onPress={() => {onExit()}}/>
        
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
        key: 'zero',
        testComponent: welcomeScreen(),
        backgroundColor: "#131520"
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
      if (type != "first"){
        slides.push({
          key: 'nine',
          testComponent: readyScreen(),
          backgroundColor: "#FC2044"
        })
      } 
      else if (type == "first") {
        slides.push({
          key: 'seven',
          testComponent: warningScreen(),
          backgroundColor: "#FC2044"
        },
        {
          key: 'eight',
          testComponent: warningScreen2(),
          backgroundColor: "#FC2044"
        },)
      }
    }

    adjustSlides()

    //Neue Version: Langes Schrollpanel mit Statusbar (04. September 2022)
    return (
      <div style={styles.container}>

        {/* {type != "first" [<div style={{position: "absolute", zIndex: 10000}}>
            <div style={{ height: "1%" }}></div>

            <div style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
              <div style={{marginLeft: 20}}>
                  <BackButton onPress={() => hide()}/>
              </div>
              <p style={styles.heading}>Tutorial</p>
            </div>

            <div style={{ height: "1%"}}></div>
          </div>]} */}

          {type != 'first' ? <div style={{display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                <div style={{marginLeft: "1rem"}}>
                    <BackButton onPress={() => onExit()} hoverColor={"rgba(255,255,255,0.25)"}/>
                </div>
                <div style={{width: "1rem"}}></div>
                <div>
                <p style={styles.navigation_heading}>WeedStats Premium</p>
                </div>
            </div> : null}

          {slides.map((slide) => {
            return RenderItem(slide);
          })}
 
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
        maxWidth: 700
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
      width: "90%",
      display: "block",
      margin: "auto"
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
      fontWeight: 700
    },
    text: {
      color: "white",
      textAlign: "left",
      fontFamily: "Poppins",
      fontSize: "1.5rem",
      marginHorizontal: "15%",
      fontWeight: 700
    },
    small_logo: {
      width: "8%",
      height: "8%"
    },
    title2: {
      color: "white",
      textAlign: "left",
      fontFamily: "Poppins",
      fontSize: "3.5rem",
      marginHorizontal: "10%",
      fontWeight: 700
    },
    text2: {
      color: "white",
      textAlign: "left",
      fontFamily: "PoppinsMedium",
      fontSize: "2rem",
      marginHorizontal: "10%"
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
      height: "50%",
      resizeMode: "contain",
      alignSelf: "center"

    },
    navigation_heading: {
      color: "white",
      fontSize: "1.5rem",
      fontFamily: "Poppins",
      textAlign: "left"
    },
};