import React from "react";

const Support = ({ language }) => {
    return (
        <div className="content_container" id="support">

            <p className="content_heading">{language.support_heading}</p>

            {language.short == "de" ? 
            <>
            <p className="content_text">WeedStats ist im Moment ein Hobbyprojekt. 
            Wenn du den Entwicklern gern etwas zurückgeben möchtest, dann kannst du über 
            die Premium-Version von WeedStats nachdenken. Für einmalige 0,99€ erhälst du 
            nicht nur eine komplett werbefreie Version von WeedStats, sondern ebenso 
            zusätzliche Features und erhöhte Priorität, falls es Probleme mit deinem 
            Konto geben sollte. <br/><br/> Um die Premium-Version freizuschalten, navigiere
            innerhalb der App zur Schaltfläche "Premium" in der Kontoansicht. <br/><br/></p>

            <p className="content_text" style={{fontWeight: 700, color: "#F2338C"}}>Warum es sich für dich lohnen könnte:<br/>(Was ist in Zukunft geplant?)</p>
            <ul className="content_text">
                <li>Leaderboards</li>
                <li>WeedStats Snapshots (Story-ähnliches Feature)</li>
                <li>zusätzliche Rauch-Arten</li>
            </ul>
            </>
            :
            <>
            <p className="content_text">WeedStats is currently just a hobby project.
             If you'd like to give something back to the developers, you should
             consider the premium version of WeedStats. For a one-off fee of €0.99 you will receive
             not only a completely ad-free version of WeedStats, but also
             additional features and increased priority in case there are problems with your
             account. <br/><br/> To unlock the premium version, navigate
             within the app to the "Premium" button in the account view. <br/><br/></p>

            <p className="content_text" style={{fontWeight: 700, color: "#F2338C"}}>Why it might be worth it for you:<br/>(What's planned for the future?)</p>
            <ul className="content_text">
                <li>Leaderboards</li>
                <li>WeedStats Snapshots (Story-like Feature)</li>
                <li>more smoking-options</li>
            </ul>
            </>}

        </div>
    )
}

export default Support