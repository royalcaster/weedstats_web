//React
import React, { useEffect, useState, useContext, createRef } from "react";

//Custom Components
import ProfileImage from "../../common/ProfileImage";
import CustomMarker from "../../common/CustomMarker";
import Empty from '../../common/Empty';
import MarkerList from "./MarkerList/MarkerList";
import Donation from "../Main/Donation/Donation";

//Third Party
import { FaUserFriends, FaMapMarked } from 'react-icons/fa'
import { BiMap } from 'react-icons/bi'
import { GoogleMap, Marker, useJsApiLoader,  } from '@react-google-maps/api';

//Konstanten
import { mapStyle } from "../../../data/CustomMapStyle";

//Service
import { UserContext } from "../../../data/UserContext";
import { LanguageContext } from "../../../data/LanguageContext";
import { FriendListContext } from "../../../data/FriendListContext";
import { getLocalData } from "../../../data/Service";
import TypeImage from "../../common/TypeImage";
import IconButton from "../../common/IconButton";

import './Map.css'

const Map = ({ getFriendList }) => {

  //Context
  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  const friendList = useContext(FriendListContext);

  //State
  const [view, setView] = useState("friends");
  const [localData, setLocalData] = useState([]);
  const [localDataLoaded, setLocalDataLoaded] = useState(false);
  const [mapType, setMapType] = useState("standard");
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [showMakerList, setShowMarkerList] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.745
  })

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB5qQ0ApePizK0VrhpKrNlTLmn4aLgEU6o"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  //Ref
  const mapViewRef = createRef();

  async function init() {
    fillMarkers(); //Freunde + deren letzte Einträge
    /* setLocalData(filterNull(await getLocalData(user, () => null))); //Einträge des Users für Heatmap */
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (markers.length != 0) {
      setRegion({
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25
      });
    }
    else {
      setRegion({
        latitude: 50,
        longitude: 39,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25
      });
      setLoading(false);
    }
  },[markers]);

  useEffect(() => {
    if (localData != null) {
      setLocalDataLoaded(true);
    }
  },[localData]);

  useEffect(() => {
    if (view == "heatmap" && localData.length != 0) {
      setRegion({
        latitude: localData[localData.length-1].latitude,
        longitude: localData[localData.length-1].longitude,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25
      });
    }

    if (view == "friends" && markers.length != 0) {
      setRegion({
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25
      });
    }
  },[view]);

  const fillMarkers = () => {
    setLoading(true);
    setCenter({lat: friendList[1].last_entry_latitude, lng: friendList[1].last_entry_longitude})
    console.debug({lat: friendList[1].last_entry_latitude, lng: friendList[1].last_entry_longitude});
    if (user.last_entry_type != null) {
      setMarkers([{
        latitude: user.last_entry_latitude,
        longitude: user.last_entry_longitude,
        timestamp: user.last_entry_timestamp,
        type: user.last_entry_type,
        photoUrl: user.photoUrl,
        username: user.username
      }]);
    }
    friendList.forEach((friend) => {
      if (
          friend.config.shareLastEntry && 
          friend.config.shareGPS &&
          friend.last_entry_latitude != null &&
          friend.last_entry_longitude != null &&
          friend.last_entry_timestamp != null &&
          friend.last_entry_type != null
        ) {
        setMarkers(oldMarkers => [...oldMarkers, {
          latitude: friend.last_entry_latitude,
          longitude: friend.last_entry_longitude,
          timestamp: friend.last_entry_timestamp,
          type: friend.last_entry_type,
          photoUrl: friend.photoUrl,
          username: friend.username
        }])
      }
    });
    setLoading(false)
  }

  const toggleMapType = () => {
    mapType == "standard" ? setMapType("hybrid") : setMapType("standard");
  }

  const chopTimeStamp = (timestamp) => {
    var a = new Date(timestamp);
    return [a.toDateString(), a.toTimeString().substring(0, 5) + " Uhr"];
  };

  const filterNull = (array) => {
    
    return array.filter((entry) => {
      
      return entry.latitude != null && entry.longitude != null;
    });
  };

  const renderItem = (item) => {
    return (
        <div
          style={{ flexDirection: "row", height: "100%", alignItems: "center" }}
        >
          <div style={{ flex: 1 }}>
            <ProfileImage url={item.photoUrl} x={100} type={2} />
          </div>

          <div
            style={{
              flex: 2,
              flexDirection: "column",
              paddingLeft: 15,
              height: "80%"
            }}
          >
            <div style={{ flex: 2 }}>
              <p
                style={{
                  color: "white",
                  fontFamily: "PoppinsMedium",
                  height: "100%",
                  textAlignVertical: "center",
                  fontSize: "1.5rem"
                }}
              >
                {item.username}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "PoppinsMedium",
                  height: "100%",
                  textAlignVertical: "center",
                  fontSize: "1rem",
                }}
              >
                {chopTimeStamp(item.timestamp)[0]}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "PoppinsMedium",
                  height: "100%",
                  textAlignVertical: "center",
                  fontSize: "1rem",
                }}
              >
                {chopTimeStamp(item.timestamp)[1]}
              </p>
            </div>
          </div>

          <TypeImage type={item.type}/>

          <div style={{ flex: 1 }}>
            {item.type == "joint" ? (
              <img
                style={{
                  position: "relative",
                  left: 0,
                  height: 65,
                  width: 20,
                  alignSelf: "center",
                }}
                source={require("../../../data/img/joint.png")}
              />
            ) : null}
            {item.type == "bong" ? (
              <img
                style={{
                  position: "relative",
                  left: 0,
                  height: 65,
                  width: 40,
                  alignSelf: "center",
                }}
                source={require("../../../data/img/bong.png")}
              />
            ) : null}
            {item.type == "vape" ? (
              <img
                style={{
                  position: "relative",
                  left: 0,
                  height: 65,
                  width: 40,
                  alignSelf: "center",
                }}
                source={require("../../../data/img/vape.png")}
              />
            ) : null}
            {item.type == "cookie" ? (
              <img
                style={{
                  position: "relative",
                  left: 0,
                  height: 55,
                  width: 50,
                  alignSelf: "center",
                }}
                source={require("../../../data/img/cookie.png")}
              />
            ) : null}
            {item.type == "pipe" ? (
              <img
                style={{
                  position: "relative",
                  left: 0,
                  height: 65,
                  width: 40,
                  alignSelf: "center",
                }}
                source={require("../../../data/img/pipe.png")}
              />
            ) : null}
          </div>
        </div>
    );
  };

  const refreshMarkers = () => {
    setLoading(true);
    fillMarkers();
    setLoading(false);
    setShowMarkerList(true);
  }

  return (
    <div style={styles.container}>
      <div style={{ alignItems: "center" }}>
        
        {showMakerList ? <MarkerList onRefresh={() => refreshMarkers()} markers={markers} onExit={() => setShowMarkerList(false)} setRegion={(region) => mapViewRef.current.animateCamera(region)}/> : null}
        {showDonation ? <Donation onexit={() => setShowDonation(false)}/> : null}

        {isLoaded ? (
              <GoogleMap
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                mapContainerClassName="map_container"
                options={{fullscreenControl: false, zoomControl: false, disableDefaultUI: true, styles: mapStyle}}
              >
                { /* Child components, such as markers, info windows, etc. */ }

                {loading ? null : 
                <Marker position={{lat: markers[0].latitude, lng: markers[0].longitude}}>
                  <div style={{height: 50, width: 50, backgroundColor: "green"}}>
                  </div>
                </Marker>}
                

              </GoogleMap>
          ) : <></>}

        {!loading && localDataLoaded ? (
          <>
          
          {/* <MapView
            ref = {mapViewRef}
            provider={PROVIDER_GOOGLE}
            style={[{ height: windowHeight }, styles.map]}
            customMapStyle={mapStyle}
            showsUserLocation={true}
            mapType={mapType}
            followsUserLocation={true}
            region={region}
            showsCompass={false}
            showsTraffic={false}
            showsIndoors={false}
            pitchEnabled={true}
            showsMyLocationButton={false}
            loadingEnabled={true}
            loadingBackgroundColor={"#131520"}
            loadingIndicatorColor={"#484F78"}
            onMapLoaded={() => markers.length != 0 ? mapViewRef.current.animateCamera({
              center: {
                 latitude: markers[0].latitude,
                 longitude: markers[0].longitude,
             },
             pitch: 0,
             zoom: 15
          }, 1000) : null}
          > 
            {view == "heatmap" ? 
            <>
            {localData.length == 0 ? 
              null
            : 
            <Heatmap
                points={localData.map((entry) => {
                  return {
                    latitude: entry.latitude,
                    longitude: entry.longitude,
                  };
                })}
                radius={40}
              /> } 
              </> : null}

            {view == "friends" && !loading ? (
              <>
                {<>
                {markers.map((marker, index) => (
                  <Marker
                    tracksViewChanges={false}
                    key={uuid.v4()}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                  >
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.2)", true)}>
                      <div style={styles.touchable}>
                      <CustomMarker
                        username={marker.username}
                        photoUrl={marker.photoUrl}
                        type={marker.type}
                        coordinate={{
                          latitude: marker.latitude,
                          longitude: marker.longitude,
                        }}
                        timestamp={marker.timestamp}
                      />
                      </div>
                    </TouchableNativeFeedback>
                  </Marker>
                ))}</>}
              </>
            ) : null}
          </MapView> */}

          {view == "heatmap" && localData.length == 0 ?
          <div style={{position: "absolute", backgroundColor: mapType == "standard" ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.9)", height: "100%", width: "100%"}}>
            <Empty title={language.map_no_entries} tip={language.map_no_entries_tip}/>
          </div> : null}

          {view == "friends" && markers.length == 0 ?
          <div style={{position: "absolute", backgroundColor: mapType == "standard" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.9)", height: "100%", width: "100%"}}>
            <Empty title={language.map_no_friends} tip={language.map_no_friends_tip}/>
          </div> : null}

          <div style={styles.iconbutton_container}>
            <div style={{flex: 1}}>
              <IconButton backgroundColor={"#F2338C"} icon={view == "heatmap" ? <FaUserFriends /> : <BiMap />} onPress={() => {view == "heatmap" ? setView("friends") : setShowDonation(true)}}/>
            </div>
            <div style={{flex: 1}}>
              <IconButton backgroundColor={"#1E2132"} icon={<FaMapMarked />} onPress={toggleMapType}/>
            </div>
          </div>
          </>
        ) : null}

        {view == "friends" ? (
          <div style={styles.iconbutton_container_left}>
            <div style={styles.touchable2}>
                <FaUserFriends style={{color: "white", fontSize: "1.5rem", textAlign: "center"}}/>
                <div>
                  {markers.length != 0 ? markers.map((marker) => {
                    return <div key={Math.random()} style={{marginTop: "0.5rem"}}><ProfileImage x={50} url={marker.photoUrl} type={1} circle={user.username == marker.username} circleColor={user.username == marker.username ? "#484F78" : "#131520"}/></div>      
                  }) : null}
                </div>
                </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Map;

const styles = {
  container: {
    backgroundColor: "#171717",
    flex: 1
  },
  map: {
    /* width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "#171717", */
  },
  item: {
    height: 80,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#1E2132",
    position: "absolute",
    zIndex: 2,
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
  },
  touchable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    fontFamily: "PoppinsLight",
    fontSize: 18,
    height: "100%",
    textAlignVertical: "center",
  },
  iconbutton_container: {
    flexDirection: "row",
    alignSelf: "center",
    right: 0,
    bottom: "2rem",
    position: "absolute",
    justifyContent: "space-between",
    width: "35%",
  },
  iconbutton_container_left: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    bottom: "15%",
    left: 0,
    position: "absolute",
    backgroundColor: "#1E2132",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: "30%",
    overflow: "hidden",
    
  },
  touchable2: {
    padding: 10,
    width: "100%",
    height: "100%"
  },
};
