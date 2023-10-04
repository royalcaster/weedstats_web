//React
import React, { useEffect, useState, useContext, createRef } from "react";

//Custom Components
import ProfileImage from "../../common/ProfileImage";
import CustomMarker from "../../common/CustomMarker";
import Empty from '../../common/Empty';
import MarkerList from "./MarkerList/MarkerList";
import Donation from "../Main/Donation/Donation";
import CustomLoader from '../../common/CustomLoader'

//Third Party
import { FaUserFriends, FaMapMarked } from 'react-icons/fa'
import { BiMap } from 'react-icons/bi'
import { GoogleMap, Marker, useJsApiLoader, LoadScript, OverlayView } from '@react-google-maps/api';

//Konstanten
import { mapStyle } from "../../../data/CustomMapStyle";

//Service
import { UserContext } from "../../../data/UserContext";
import { LanguageContext } from "../../../data/LanguageContext";
import { FriendListContext } from "../../../data/FriendListContext";
import { shadeColor } from "../../../data/Service";
import TypeImage from "../../common/TypeImage";
import IconButton from "../../common/IconButton";

import './Map.css'
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Map = ({ getFriendList }) => {

  //Context
  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  const friendList = useContext(FriendListContext);

  //State
  const [view, setView] = useState("friends");
  const [localData, setLocalData] = useState([]);
  const [localDataLoaded, setLocalDataLoaded] = useState(false);
  const [mapType, setMapType] = useState("roadmap");
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMakerList, setShowMarkerList] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [center, setCenter] = useState();
  const [markers, setMarkers] = useState([])
  const [map, setMap] = useState(null);

  //navigation
  const navigate = useNavigate();

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    console.log("loading map");
    setMap(map)
    }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  useEffect(() => {
    if (friendList.length !== 0 && map) {
      map.panTo({lat: friendList[0].last_entry_latitude, lng: friendList[0].last_entry_longitude});
    }
  },[friendList]);

  useEffect(() => {
    fillMarkers();
  }, []);

  useEffect(() => {
    if (friendList.length != 0) {
      setCenter({
        lat: friendList[0].last_entry_latitude,
        lng: friendList[0].last_entry_longitude
      });
    }
    else {
      setCenter({
        lat: 50,
        lng: 39,
      });
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    console.debug(loading);
    console.debug(map);
  },[loading, map]);

  /* useEffect(() => {
    if (localData != null) {
      setLocalDataLoaded(true);
    }
  },[localData]); */

  useEffect(() => {
    if (view == "heatmap" && localData.length != 0) {
      /* setRegion({
        latitude: localData[localData.length-1].latitude,
        longitude: localData[localData.length-1].longitude,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25
      }); */
    }

    if (view == "friends" && friendList.length != 0) {
      /* setRegion({
        latitude: markers[0].last_entry_latitude,
        longitude: markers[0].last_entry_longitude,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25
      }); */
    }
  },[view]);

  const fillMarkers = () => {
    setLoading(true);

    // wenn vorhanden, Nutzer als ersten Eintrag hinzufügen
    if (user.last_entry_latitude != null) {
      setCenter({lat: user.last_entry_latitude, lng: user.last_entry_longitude})
      setMarkers([{
        latitude: user.last_entry_latitude,
        longitude: user.last_entry_longitude,
        timestamp: user.last_entry_timestamp,
        type: user.last_entry_type,
        photoUrl: user.photoUrl,
        username: user.username
      }]);
    }

    //danach Restliche Freunde hinzufügen (wenn config es zulässt)
    if (friendList.length !== 0) {
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
      setCenter({lat: friendList[0].last_entry_latitude, lng: friendList[0].last_entry_longitude})
    }
    setLoading(false);
  }

  const toggleMapType = () => {
    mapType == "roadmap" ? setMapType("hybrid") : setMapType("roadmap");
  }

  const chopTimeStamp = (timestamp) => {
    var a = new Date(timestamp);
    return [a.toDateString(), a.toTimeString().substring(0, 5) + " Uhr"];
  };

  /* const filterNull = (array) => {
    
    return array.filter((entry) => {
      
      return entry.latitude != null && entry.longitude != null;
    });
  }; */

  const refreshMarkers = () => {
    fillMarkers();
    setShowMarkerList(true);
  }

  return (
      <>
      {showMakerList ? <MarkerList onRefresh={() => refreshMarkers()} markers={markers} onExit={() => setShowMarkerList(false)} setRegion={(lat, lng) => {setShowMarkerList(false); map.panTo({lat: lat, lng: lng}); map.setZoom(17)}}/> : null}
      {showDonation ? 
      <div style={{backgroundColor: "rgba(0,0,0,0.5)", height: "100vh", width: "100vw", position: "absolute", zIndex: 10, justifyContent: "center", display: "flex"}}>
        <div style={{width: "100%", maxWidth: 700, height: "100%", position: "absolute", zIndex: 10}}>
          <Donation onExit={() => setShowDonation(false)}/> 
        </div>
      </div>
      : null}

    <div style={styles.container}>
      <div style={{ alignItems: "center", height: "100%" }}>

        {!loading ?
        <LoadScript
        googleMapsApiKey="AIzaSyB5qQ0ApePizK0VrhpKrNlTLmn4aLgEU6o"
      >
        <GoogleMap
          mapContainerClassName="map_container"
          zoom={16}
          options={{
            disableDefaultUI: true,
            gestureHandling: "greedy",
            mapTypeId: mapType,
            mapId: "a978e762b453a0fa"
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
          clickableIcons={false}
          tilt={45}
        >
          {loading ? null :
              <>

              {friendList.map((friend) => {
                  return  <OverlayView
                position={{lat: friend.last_entry_latitude, lng: friend.last_entry_longitude}}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <CustomMarker
                  key={Math.random()} 
                  username={friend.username} 
                  photoUrl={friend.photoUrl}
                  timestamp={friend.last_entry_timestamp}
                  type={friend.last_entry_type}
                  onClick={() => {map.panTo({lat: friend.last_entry_latitude, lng: friend.last_entry_longitude}); map.setZoom(17)}}
                />
              </OverlayView>
                })}
              </>
              }
        </GoogleMap>
      </LoadScript> : <CustomLoader />}
          

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
          </>
        ) : null}

          <div style={styles.iconbutton_container}>
            <div style={{flex: 1}}>
              <IconButton x={20} backgroundColor={"#F2338C"} hoverColor={shadeColor("#F2338C",-25)} icon={view == "heatmap" ? <FaUserFriends style={{color: "white"}}/> : <BiMap style={{color: "white", fontSize: "2rem"}}/>} onPress={() => {view == "heatmap" ? setView("friends") : navigate("/home/counter/premium")}}/>
            </div>
            <div style={{height: 10}}></div>
            <div style={{flex: 1}}>
              <IconButton x={20} backgroundColor={"#484F78"} hoverColor={shadeColor("#484F78",-25)} icon={<FaMapMarked style={{color: "white"}}/>} onPress={toggleMapType}/>
            </div>
          </div>

        {view == "friends" ? (
          <>
          <div style={styles.iconbutton_container_left} onClick={() => setShowMarkerList(true)}>
            <div style={styles.touchable2} className="iconbutton_container_left">
              <div style={{position: "absolute", height: "50%", width: "100%", bottom: 0}} className="gradient"></div>
                <div style={{justifyContent: "center", display: "flex", marginTop: 10}}>
                  <FaUserFriends style={{color: "white", fontSize: "1.5rem", textAlign: "center"}}/>
                </div>
                <div>
                  {markers.length != 0 ? markers.map((marker) => {
                    return <div key={Math.random()} style={{marginTop: "0.5rem"}}><ProfileImage x={50} url={marker.photoUrl} type={1} circle={user.username == marker.username} circleColor={user.username == marker.username ? "#484F78" : "#131520"}/></div>      
                  }) : null}
                </div>
            </div>
          </div>
          </>
        ) : null}
      </div>
    </div></>
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
    right: 10,
    bottom: "2rem",
    position: "absolute",
    justifyContent: "space-between"
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
    backgroundColor: "#484F78",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: "30%",
    overflow: "hidden",
    cursor: "pointer"
  },
  touchable2: {
    padding: 10,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
};
