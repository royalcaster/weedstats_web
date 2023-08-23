//react
import React, { useRef, useEffect, useContext } from "react";


//Service
import { LanguageContext } from "../../../data/LanguageContext";
import { UserContext } from "../../../data/UserContext";

//Custom Components
import FriendList from "./FriendList/FriendList";
import SearchPanelButton from "./SearchPanelButton/SearchPanelButton";
import FriendRequestButton from "./FriendRequestButton/FriendRequestButton";
import IconButton from "../../common/IconButton";
import { shadeColor } from "../../../data/Service";

import { BiUserCheck, BiUserPlus } from 'react-icons/bi'
import { useState } from "react";
import SearchPanel from "./SearchPanelButton/SearchPanel/SearchPanel";
import { Routes, Route, useNavigate } from "react-router-dom";
import FriendRequests from "./FriendRequestButton/FriendRequests/FriendRequests";
import FriendPage from "./FriendList/FriendListItem/FriendPage/FriendPage";

const Friends = ({ toggleNavbar, getFriendList, refreshUser, friendList }) => {

    //Context
    const language = useContext(LanguageContext);

    //navigation
    const navigate = useNavigate()

    //State
    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [showRequests, setShowRequests] = useState(false);

    return (<>
    
    <Routes>
      <Route index path="/" element={<div style={styles.container}>
        <div style={{maxWidth: 700, margin: "auto"}}>
        <div style={{ alignItems: "center", flexDirection: "row", marginBottom: 0, zIndex: 10000}}>
          
        <div style={{ display: "flex" }}>
          <div style={{flex: 1}}> 
            <p style={styles.bold_heading}>{language.friends_friends}</p>
          </div>
          <div style={{flex: 2}}></div>
          <div style={{flex: 1, alignItems: "center", justifyContent: "center", display: "flex", paddingRight: "1rem"}}>
            <div>
              <IconButton onPress={() => navigate('/home/friends/search')} x={20} icon={<BiUserPlus style={styles.icon} />} backgroundColor={"#1E2132"} hoverColor={shadeColor("#1E2132",-25)}/>
            </div>
            <div style={{width: "1rem"}}></div>
            <div>
              <IconButton onPress={() => navigate('/home/friends/requests')} x={20} icon={<BiUserCheck style={styles.icon}/>} backgroundColor={"#1E2132"} hoverColor={shadeColor("#1E2132",-25)}/>
            </div>
          </div>
        </div>
  
            <div style={{flex: 1}}></div>

            <SearchPanelButton />

            <FriendRequestButton refreshUser={refreshUser} getFriendList={getFriendList}/>

            <div style={{ width: 20 }}></div>
        </div>

        <FriendList friendList={friendList} getFriendList={getFriendList} refreshUser={refreshUser} />
        </div>
      </div>}/>

      <Route exact path="/search" element={<SearchPanel onExit={() => navigate("/home/friends")} />}/>
      <Route exact path="/requests" element={<FriendRequests onExit={() => navigate("/home/friends")} />}/>
      
      {
        friendList.map((friend) => {
          return <Route path={"/" + friend.id} element={<FriendPage onExit={() => navigate("/home/friends")} refreshUser={refreshUser} user={friend}/>} />
        })
      }
    </Routes>

    </>)
}

export default Friends

const styles = {
container: {
    height: "100%",
    width: "100%",
    zIndex: 10,
    margin: "auto",
    },
    bold_heading: {
        color: "white",
        fontFamily: "PoppinsBlack",
        fontSize: "2rem",
        marginLeft: "2rem"
    },
    bold_heading: {
      color: "white",
      fontFamily: "Poppins",
      fontSize: "2rem",
      fontWeight: 700,
      marginLeft: "1rem"
    },
    icon: {
      color: "white",
      fontSize: "1.5rem"
    }
};