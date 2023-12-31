import { useContext, useEffect } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    createRoutesFromElements,
    BrowserRouter,
    Routes
  } from "react-router-dom";
import { UserContext } from "../../data/UserContext";

//Navigation
import { useNavigate, useLocation } from "react-router-dom";

//Custom Components
import Main from "./Main/Main";
import Empty from "../common/Empty";
import MenuButton from "./MenuButton/MenuButton";
import Config from "./Config/Config"
import Map from './Map/Map'
import Friends from './Friends/Friends'

//Third Party
import { FaChartArea, FaMapMarker } from 'react-icons/fa'
import { FaSliders, FaUser } from "react-icons/fa6";
import Stats from "./Stats/Stats";
  
  const Home = ({ onSetUser, onWriteComplete, friendList, handleLogOut, toggleLanguage, deleteAccount, getFriendList, loadSettings, refreshUser, handleIntroFinish, loadingParent }) => {

    // Context
    const user = useContext(UserContext);

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();

    /* useEffect(() => {
      if (user == null) {
        navigate("/login")
      }
      else {
        navigate("/home/counter")
      }
    },[]); */

    return (
      
      <>
        <div style={{height: "92vh", width: "100%", top: 0, position: "absolute", justifyContent: "center", display: "flex"}}>
          {!loadingParent ?
            <Routes>
              <Route path="/counter/*" element={<Main onWriteComplete={onWriteComplete} onSetUser={onSetUser} refreshUser={refreshUser}/>} />
              <Route path="/stats/*" element={<Stats />} />
              <Route path="/config" element={<Config handleLogOut={handleLogOut} toggleLanguage={toggleLanguage} loadSettings={loadSettings} refreshUser={refreshUser} deleteAccount={deleteAccount}/>}/>
              <Route path="/map" element={<Map />} />
              <Route path="/friends/*" element={<Friends friendList={friendList} refreshUser={refreshUser}/>} />
            </Routes>
            : <Empty title={"loading app"}/>
          }
        </div>

        <div style={{backgroundColor: "#484F78", borderRadius: 15, height: "8vh", width: "97.5%", bottom: 0, position: "absolute", display: "flex", flexDirection: "row",  transform: `translate(-50%, -7.5%)`, left: "50%", overflow: "hidden", maxWidth: 700, zIndex: 1000}}>
          <MenuButton onPress={() => navigate('/home/stats')} icon={<FaChartArea style={{color: location.pathname == "/home/stats" ? "white" : "#1E2132", fontSize: "1.5rem"}}/>}/>
          <MenuButton onPress={() => navigate('/home/map')} icon={<FaMapMarker style={{color: location.pathname == "/home/map" ? "white" : "#1E2132", fontSize: "1.5rem"}}/>}/>
          <MenuButton onPress={() => navigate('/home/counter')} icon={location.pathname == "/home/counter" ? <img style={{height: "3rem", width: "3rem"}} src={require('../../data/img/icon.png')}/> : <img style={{height: "3rem", width: "3rem"}} src={require('../../data/img/logo_bw.png')}/>}/>
          <MenuButton onPress={() => navigate('/home/config')} icon={<FaSliders style={{color: location.pathname == "/home/config" ? "white" : "#1E2132", fontSize: "1.5rem"}}/>}/>
          <MenuButton onPress={() => navigate('/home/friends')} icon={<FaUser style={{color: location.pathname == "/home/friends" ? "white" : "#1E2132", fontSize: "1.5rem"}}/>}/>
        </div>
        
      </>
  
    );
  }
  
  export default Home;
  
  {/* <BrowserRouter>
        <Routes>
          <Route path="login" element={<Users/>} />
        </Routes>
      </BrowserRouter> */}
  