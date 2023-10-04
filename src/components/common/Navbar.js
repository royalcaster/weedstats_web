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
import MenuButton from "../Home/MenuButton/MenuButton";

//Third Party
import { FaChartArea, FaMapMarker } from 'react-icons/fa'
import { FaSliders, FaUser } from "react-icons/fa6";

import './Navbar.css'

const Navbar = ({ onPressStats, onPressMap, onPressCounter, onPressConfig, onPressFriends }) => {

    // URL-Location
    const location = useLocation();

    return (
        <div style={{backgroundColor: "#1E2132", width: "100%", position: "absolute", overflow: "hidden", maxWidth: 700, zIndex: 1000, bottom: 0}}>
            <div style={{display: "flex",  borderRadius: 10, height: "8vh", width: "95%", margin: "auto", marginBottom: 10, overflow: "hidden"}} className="navbar">
                <MenuButton onPress={onPressStats} icon={<FaChartArea style={{color: location.pathname == "/home/stats" ? "white" : "#1E2132", fontSize: "1.5rem"}}/>}/>
                <MenuButton onPress={onPressMap} icon={<FaMapMarker style={{color: location.pathname == "/home/map" ? "white" : "#1E2132", fontSize: "1.5rem"}}/>}/>
                <MenuButton onPress={onPressCounter} icon={location.pathname == "/home/counter" ? <img style={{height: "3rem", width: "3rem"}} src={require('../../data/img/icon.png')}/> : <img style={{height: "3rem", width: "3rem"}} src={require('../../data/img/logo_bw.png')}/>}/>
                <MenuButton onPress={onPressConfig} icon={<FaSliders style={{color: location.pathname == "/home/config" ? "white" : "#1E2132", fontSize: "1.5rem"}}/>}/>
                <MenuButton onPress={onPressFriends} icon={<FaUser style={{color: location.pathname == "/home/friends" ? "white" : "#1E2132", fontSize: "1.5rem"}}/>}/>
            </div>
        </div>
    )
}

export default Navbar