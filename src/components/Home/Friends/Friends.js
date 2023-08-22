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

const Friends = ({ toggleNavbar, getFriendList, refreshUser, friendList }) => {

    //Context
    const language = useContext(LanguageContext);

    return (<>
    
    <div style={styles.container}>
        <div style={{ alignItems: "center", flexDirection: "row", marginBottom: 0, zIndex: 10000}}>
          
        <div style={{ display: "flex" }}>
          <div style={{flex: 1}}> 
            <p style={styles.bold_heading}>{language.friends_friends}</p>
          </div>
          <div style={{flex: 1, alignItems: "center", justifyContent: "center", display: "flex"}}>
            <div style={{height: "3rem", width: "3rem"}}>
              <IconButton backgroundColor={"#484F78"} hoverColor={shadeColor("#484F78",-25)}/>
            </div>
            <div style={{width: "1rem"}}></div>
            <div style={{height: "3rem", width: "3rem"}}>
              <IconButton backgroundColor={"#484F78"} hoverColor={shadeColor("#484F78",-25)}/>
            </div>
          </div>
        </div>
  
            <div style={{flex: 1}}></div>

            <SearchPanelButton />



            <FriendRequestButton refreshUser={refreshUser} getFriendList={getFriendList}/>

            <div style={{ width: 20 }}></div>
        </div>

        {/* <FriendList friendList={friendList} getFriendList={getFriendList} refreshUser={refreshUser} /> */}

      </div>

    </>)
}

export default Friends

const styles = {
container: {
    height: "100%",
    width: "100%",
    zIndex: 10,
    maxWidth: 700,
    margin: "auto"
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
};