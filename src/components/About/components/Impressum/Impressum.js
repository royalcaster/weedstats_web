import React from "react";

const Impressum = ({ language }) => {
    return (
        <div className="content_container" style={{width: "100vw", backgroundColor: "#131520", maxWidth: "none", borderRadius: 0}}>

            <div className="impressum_flex_container content_text" style={{color: "rgba(255,255,255,0.5)"}}>
               
                <div style={{flex: 1}}>
                <p className="content_heading" style={{color: "rgba(255,255,255,0.6)", fontSize: "1.5rem"}}>{language.impressum_heading}</p>

                    Gabriel Pechstein<br/>
                    Chemnitzer Str. 67<br/>
                    01187 Dresden<br/>
                    Germany<br/><br/>

                    <p className="content_heading" style={{color: "rgba(255,255,255,0.6)", fontSize: "1rem"}}>Kontakt:</p>
                    +49 176 41121760<br/>
                    royalcaster03@gmail.com<br/><br/>

                    <p className="content_heading" style={{color: "rgba(255,255,255,0.6)", fontSize: "1rem"}}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</p>
                    Gabriel Pechstein<br/>
                    Chemnitzer Str. 67<br/>
                    01187 Dresden<br/>
                    Germany<br/><br/>

                    <p className="content_heading" style={{color: "rgba(255,255,255,0.6)", fontSize: "1rem"}}>Haftungsausschluss:</p>
                    Der Betreiber dieser App übernimmt keine Gewähr für die Aktualität, 
                    Richtigkeit, Vollständigkeit oder Qualität der bereitgestellten Informationen. 
                    Haftungsansprüche gegen den Betreiber, welche sich auf Schäden materieller 
                    oder immaterieller Art beziehen, die durch die Nutzung oder Nichtnutzung 
                    der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und 
                    unvollständiger Informationen verursacht wurden, sind grundsätzlich
                    ausgeschlossen.<br/><br/>
                    <p className="content_heading" style={{color: "rgba(255,255,255,0.6)", fontSize: "1rem"}}>Urheberrecht:</p>
                    Die durch den Betreiber dieser App erstellten Inhalte und Werke auf dieser 
                    App unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
                    Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                    bedürfen der schriftlichen Zustimmung des Betreibers. Downloads und Kopien 
                    dieser App sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. 
                    Soweit die Inhalte auf dieser App nicht vom Betreiber erstellt wurden, 
                    werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte 
                    Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine 
                    Urheberrechtsverletzung aufmerksam werden, bitten wir um einen 
                    entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden 
                    wir derartige Inhalte umgehend entfernen.
                </div>
                <div style={{flex: 1, flexDirection: "column", display: "flex"}}>
                    <a href="#idea">Idee</a>
                    <a href="#features">Funktionen</a>
                    <a href="#support">Unterstützen</a>
                    <a href="#gettheapp">Hol dir die App</a>
                </div>
            </div>

        </div>
    )
}

export default Impressum