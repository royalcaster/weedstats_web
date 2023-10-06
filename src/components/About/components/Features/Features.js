import React, { useState } from "react";
import TabBar from "./TabBar/TabBar";

const Features = ({ language }) => {

    const [view, setView] = useState("main");

    return (
        <div className="content_container" style={{backgroundColor: "#131520"}} id="features">

            <p className="content_heading">{language.features_heading}</p>

            <p className="content_text">{language.features_text}</p>

            <div style={{height: "50px"}}></div>

            <TabBar language={language} view={view} setView={(v) => setView(v)}/>

            <div style={{height: "30px"}}></div>

            <div className="feature_panel_container">

            <div style={{flex: 2, justifyContent: "center"}}>
                {view === "main" ? <>
                    {language.features_main.map((text) => {
                        return <p className="feature_panel_text">{text}</p>
                    })}
                </> : null}
                {view === "stats" ? <>
                    {language.features_stats.map((text) => {
                        return <p className="feature_panel_text">{text}</p>
                    })}
                </> : null}
                {view === "map" ? <>
                    {language.features_map.map((text) => {
                        return <p className="feature_panel_text">{text}</p>
                    })}
                </> : null}
                {view === "config" ? <>
                    {language.features_config.map((text) => {
                        return <p className="feature_panel_text">{text}</p>
                    })}
                </> : null}
                {view === "friends" ? <>
                    {language.features_friends.map((text) => {
                        return <p className="feature_panel_text">{text}</p>
                    })}
                </> : null}
            </div>

            <div style={{flex: 1}}>
                <img src={require("./../../img/smartphone.png")} style={{maxWidth: "300px", marginLeft: "auto", marginRight: "auto", display: "block"}}/>
            </div>

            </div>

        </div>
    )
}

export default Features