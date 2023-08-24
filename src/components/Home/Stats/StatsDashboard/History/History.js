//React
import React, { useEffect, useRef, useState, useContext } from "react";

//Custom Components
import HistoryItem from './HistoryItem/HistoryItem'
import IconButton from '../../../../common/IconButton'
import Button from '../../../../common/Button'
import CustomMarker from "../../../../common/CustomMarker";
import BackButton from "../../../../common/BackButton";

//Konstanten
import { mapStyle } from "../../../../../data/CustomMapStyle";

//Service
import { LanguageContext } from "../../../../../data/LanguageContext";
import { UserContext } from "../../../../../data/UserContext";
import CustomModal from "../../../../common/CustomModal";

const History = ({ show, onExit, history}) => {
    
  const language = useContext(LanguageContext);

  const user = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [mapType, setMapType] = useState("standard");
  const switch_icon = <p>switch_icon</p>

  const showOnMap = (entry) => {
    setActiveEvent(entry);
    setShowMap(true);
  };

  const renderItem = ({ item }) => (
    <HistoryItem event={item} showOnMap={showOnMap} />
  );

  const toggleMapType = () => {
    mapType == "standard" ? setMapType("hybrid") : setMapType("standard");
  }

  const mapModalContent =  <>
    <div style={{position: "absolute", zIndex: 20, bottom: "12.5%", width: "60%", alignSelf: "center"}}>
      <div style={{alignSelf: "center"}}>
        <IconButton icon={switch_icon} onPress={toggleMapType}/>
      </div>
      <div style={{height: 20}}></div>
      <Button title={"Schließen"} color={"#eb4034"} borderradius={100} onPress={() => {setShowMap(false); setActiveEvent(null)}} fontColor={"white"}/>
    </div>
  {/* {showMap ? 
    <MapView
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        longitude: activeEvent.longitude,
        latitude: activeEvent.latitude,
        longitudeDelta: 0.25,
        latitudeDelta: 0.25
      }}
      style={styles.map}
      customMapStyle={mapStyle}
      showsUserLocation={true}
      followsUserLocation={true}
      showsCompass={false}
      showsTraffic={false}
      showsIndoors={true}
      mapType={mapType}
      pitchEnabled={true}
      showsMyLocationButton={false}
    >
        <>
            <Marker
              tracksViewChanges={false}
              key={uuid.v4()}
              coordinate={{
                latitude: activeEvent.latitude,
                longitude: activeEvent.longitude,
              }}
            >
              <CustomMarker
                photoUrl={user.photoUrl}
                type={activeEvent.type}
                withOutDate={true}
              />
            </Marker>
        </>

    </MapView>: null} */}
  </>;

  return (
    <>
        <div style={styles.container}>
          <div style={{height: 50}}></div>

          <CustomModal show={showMap} child={mapModalContent}/>

      <div style={{height: 60, alignItems: "center", flexDirection: "row"}}>
          <div style={{position: "absolute", zIndex: 2000, left: 15, top: "1rem"}}>
              <BackButton onPress={() => onExit()}/>
          </div>
          <p style={styles.heading}>{language.stats_history}</p>
      </div>

      {/* <FlatList
        data={history.slice().reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.number}
        initialNumToRender={8}
        maxToRenderPerBatch={2}
      /> */}
            
        </div>
    </>
  );
};

export default History;

const styles = {
  container: {
    width: "100%",
    backgroundColor: "#1E2132",
    zIndex: 5,
    position: "absolute",
    flexDirection: "column"
  },
  image: {
    width: "100%",
    position: "absolute",
    zIndex: 4,
  },
  label: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "1rem",
    fontFamily: "PoppinsLight",
    letterSpacing: 3,
    textAlignVertical: "center",
    textAlign: "center"
  },
  value: {
    color: "white",
    fontSize: "3rem",
    fontFamily: "PoppinsBlack",
    textAlignVertical: "center",
    textAlign: "center",
    height: "100%"
  },
  date: {
    color: "white",
    fontSize: "2rem",
    fontFamily: "PoppinsLight",
    textAlignVertical: "center",
    textAlign: "left",
  },
  heading: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    fontSize: "2rem",
    alignSelf: "center",
    marginLeft: 70
  },
  icon: {
    fontSize: 40,
  },
  map: {
    height: "100%",
    width: "100%",
    zIndex: 10
  }
};
