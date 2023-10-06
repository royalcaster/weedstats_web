import React from "react";

const TabBar = ({ language, view, setView }) => {
    return (
        <div className="tabbar_container">

            <div onClick={() => setView("stats")} className="tabbar_item_container" style={{borderBottom: view === "stats" ? "2px solid #409FFF" : "2px solid rgba(255,255,255,0.25)"}}>
                <p style={{color: view === "stats" ?  "#409FFF" : "white"}}>Stats</p>
            </div>

            <div onClick={() => setView("map")} className="tabbar_item_container" style={{borderBottom: view === "map" ? "2px solid #409FFF" : "2px solid rgba(255,255,255,0.25)"}}>
                <p style={{color: view === "map" ?  "#409FFF" : "white"}}>Map</p>
            </div>

            <div onClick={() => setView("main")} className="tabbar_item_container" style={{borderBottom: view === "main" ? "2px solid #409FFF" : "2px solid rgba(255,255,255,0.25)"}}>
                <p style={{color: view === "main" ?  "#409FFF" : "white"}}>Counter</p>
            </div>

            <div onClick={() => setView("config")} className="tabbar_item_container" style={{borderBottom: view === "config" ? "2px solid #409FFF" : "2px solid rgba(255,255,255,0.25)"}}>
                <p style={{color: view === "config" ?  "#409FFF" : "white"}}>Settings</p>
            </div>

            <div onClick={() => setView("friends")} className="tabbar_item_container" style={{borderBottom: view === "friends" ? "2px solid #409FFF" : "2px solid rgba(255,255,255,0.25)"}}>
                <p style={{color: view === "friends" ?  "#409FFF" : "white"}}>Friends</p>
            </div>

        </div>
    )
}

export default TabBar