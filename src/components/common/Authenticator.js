//React
import React, { useEffect, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

//Expo
import * as LocalAuthentication from 'expo-local-authentication'

//Custom Components
import Button from "./Button";

//Service
import { LanguageContext } from "../../data/LanguageContext";


const Authenticator = ({ first, onSubmit, onCancel, onExit }) => {

    //navigation
    const navigation = useNavigation()
    
    //Refs
    const slide = useRef(new Animated.Value(screen_height)).current;

    //Contexts
    const language = useContext(LanguageContext);

    useEffect(() => {
        first ? null : checkLocalAuth();
        show();
    },[]);

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
            duration: 600,
            useNativeDriver: true
        }).start(({finished}) => {
            finished ? onExit() : null;
        })
    }

    //checkt, ob Biometrie unterstützt wird & führt diese durch
    const checkLocalAuth = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        var isBiometricSupported;
        isBiometricSupported = compatible;
        
        var promise = null;
        if (isBiometricSupported) {
        promise = await handleBiometricAuth();
            if (promise.success) {
                onSubmit();
                hide();
            }
            else {
                Alert.alert("Fehler beim Entsperren");
                checkLocalAuth();
                hide();
            }
        }
    }

    //Biometrische Authentifizierung
    const handleBiometricAuth = async () => {
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics)
        return Alert.alert(
            'Biometric record not found',
            'Please verify your identity with your password',
            'OK',
            () => fallBackToDefaultAuth()
        );

        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Entsperren für WeedStats',
            disableDeviceFallback: false,
            cancelLabel: "Abbrechen"
        });

        return biometricAuth;
    }

    return <Animated.View style={[styles.container,{transform: [{translateY: slide}]}]}>

        {first ? 
        <>
        {//Wenn Authenticator das erste mal aufgerufen wird, fragt er danach, ob die App in Zukunft mit Fingerabdruck etc entsperrt werden soll
        }
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <View style={{height: "15%"}}></View>
            <IonIcons name="finger-print" style={styles.fingerprint}/>
            <View style={{height: "15%"}}></View>
            <Button title={language.activate_unlock} color={"#0080FF"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"} onPress={() => checkLocalAuth()}/>
            <Button onPress={() => {hide()}} title={language.later} color={"#484F78"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"} />
            <View style={{height: "5%"}}></View>
            <Text style={{fontFamily: "PoppinsLight", color: "#484F78", width: "80%", textAlign: "center"}}>Du kannst deine Entscheidung in den Einstellungen ändern.</Text>
        </View>
        </> 
        : 
        <>
        {//sonst wird einfach nur Fingerabdruck abegfragt
        }
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <IonIcons name="finger-print" style={styles.fingerprint}/>
        </View>
        </>}

    </Animated.View>
}

export default Authenticator