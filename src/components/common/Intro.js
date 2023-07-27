//React
import React, { useContext, useEffect, useRef, useState } from "react";

//Custom Components
import Button from "./Button";
import IntroStatusbar from "./IntroStatusbar";
import LanguageDialog from "./LanguageDialog";
import Tutorial from "./Tutorial";

import { LanguageContext } from "../../data/LanguageContext";
import Authenticator from "./Authenticator";
import TutorialDialog from "./TutorialDialog";

const Intro = ({ onExit }) => {

    const language = useContext(LanguageContext);

    const screen_height = Dimensions.get("screen").height;
    const screen_width = Dimensions.get("screen").width;

    const slide = useRef(new Animated.Value(screen_height)).current;

    const [step, setStep] = useState(1);
    const [showTutorial, setShowTutorial] = useState(false);

    const [introConfig, setIntroConfig] = useState({
        language: null,
        enableAuthentication: null
    });

    useEffect(() => {
        show();
    },[]);

    const titles = ["What language do you speak?", language.unlock_question, language.tutorial_question]

    const show = () => {
        Animated.timing(slide,{
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.bezier(0.2, 1, 0.21, 0.97),
        }).start()
    }

    const hide = () => {
        Animated.timing(slide,{
            toValue: screen_height,
            duration: 300,
            useNativeDriver: true
        }).start(({finished}) => {
            if (finished) {
                onExit(introConfig);
            }
        })
    }

    const handleStep = () => {
        if (step == 3) {
            hide();
        }
        else {
            setStep(step + 1);
        }
    }

    return (
        <Animated.View style={[styles.container,{transform:[{translateY: slide}]}]}>

            {showTutorial ? <Tutorial toggleNavbar={() => null} type={"first"} onDone={() => {setShowTutorial(false); handleStep()}}/> : null}

            <View style={{height: "5%"}}></View>
            <Image style={styles.logo} source={require("../../data/img/logo.png")}/>
            <Text style={styles.step_label}>{language.step} {step} {language.of_3}</Text>
            <IntroStatusbar progress={step}/>
            <View style={{height: "2.5%"}}></View>
            <Text style={styles.title}>{titles[step - 1]}</Text>
            {
                step == 1 ? <>
                    <LanguageDialog onSelect={(lang) => setIntroConfig({...introConfig, language: lang})} onExit={() => handleStep()}/>
                </>
                : null
            }
            {
                step == 2 ? <>
                    <Authenticator 
                        first={true} 
                        onSubmit={() => {setIntroConfig({...introConfig, enableAuthentication: true}); handleStep();}} 
                        onCancel={() => {setIntroConfig({...introConfig, enableAuthentication: false}); handleStep();}} 
                        onExit={() => {setIntroConfig({...introConfig, enableAuthentication: false}); handleStep();}}
                    />
                </>
                : null
            }
            {
                step == 3 ? <>
                    <TutorialDialog onSubmit={() => {setShowTutorial(true)}} onCancel={() => handleStep()}/>
                </>
                : null
            }
        </Animated.View>
    );
}

export default Intro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E2132",
        alignItems: "center"
    },
    logo: {
        height: "8%",
        width: "12&"
    },
    step_label: {
        color: "white",
        fontFamily: "PoppinsLight",
        alignSelf: "center",
        textAlign: "center"
    },
    title: {
        color: "white",
        fontFamily: "PoppinsMedium",
        fontSize: "2.5rem",
        maxWidth: "80%",
        textAlign: "center"
    }
});