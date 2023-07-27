//React
import React, { useRef, useContext } from "react";

//Custom Components
import BackButton from "../../../common/BackButton";

//Service
import { LanguageContext } from "../../../../data/LanguageContext";

//Third Party

const AppInfo = ({ onExit, show }) => {

  //Context
  const language = useContext(LanguageContext);

  //Constants
  const screen_width = Dimensions.get("window").width;

  //State
  const fadeAnim = useRef(new Animated.Value(screen_width)).current;

  const slide = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.bezier(0,.79,0,.99),
      useNativeDriver: true,
    }).start();
  }

  const hide = () => {
    Animated.timing(fadeAnim, {
      toValue: screen_width,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        onExit();
      }
    });
  };

  show ? slide() : hide();

  useBackHandler(() => {
    hide();
    return true;
  },[]);

  return (
    <Animated.View style={[{ opacity: 1 , transform: [{translateX: fadeAnim}]}, styles.container]}>

              <View style={{ height: responsiveHeight(5) }}></View>

              <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                <View style={{marginLeft: 20}}>
                    <BackButton onPress={() => hide()}/>
                </View>
                <Text style={styles.heading}>App-Info</Text>
              </View>

              <View style={{flex: 1, justifyContent: "center"}}>
                <Image style={{height: responsiveHeight(12), width: responsiveHeight(12), alignSelf: "center"}} source={require('../../../../data/img/logo.png')}/>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2) }]}>
                  Version 0.0.1 (Early Access)
                </Text>

                <View style={{ height: responsiveHeight(5)}}></View>
                
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.5) }]}>
                  {language.config_authors}
                </Text>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2), color: "#0080FF" }]}>
                  royalcaster{"\n"}
                  Ined{"\n"}
                  {/* yung lillo */}
                </Text>

                <View style={{ height: responsiveHeight(5)}}></View>

                <Text style={[styles.text, { fontSize: responsiveFontSize(1.8), color: "white", fontFamily: "PoppinsLight"}]}>
                  Made in Schneeberg <Entypo style={{fontSize: responsiveFontSize(1.8)}} name="heart-outlined"/>
                </Text>

                <View style={{ height: responsiveHeight(10)}}></View>
              </View>
    </Animated.View>
  );
};

export default AppInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#131520",
    paddingBottom: 30,
    zIndex: 1,
    position: "absolute",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontFamily: "PoppinsMedium",
    marginLeft: 20,
    textAlign: "left",
    marginTop: 3
  },
  text: {
    alignSelf: "center",
    fontFamily: "PoppinsLight",
    fontSize: responsiveFontSize(2),
    color: "white",
    maxWidth: 250,
    textAlign: "center",
  }
});
