import React from "react";

const Idea = ({ language }) => {
    return (
        <div className="content_container" id="idea">

            <p className="content_heading">{language.idea_heading}</p>

            {language.short === "de" ? <p className="content_text">WeedStats ist der tägliche Begleiter für alle Cannabis-Genießer.
            Die App bietet dir Möglichkeiten zum Erfassen, Auswerten und Teilen deines Konsums.<br/><br/> 
            <span style={{color: "#409FFF"}}> Dabei lassen wir dich natürlich selbst entscheiden, was du preisgibst und was nicht.</span><br/><br/>
            Welche weiteren Features für dich bereit stehen, erfährst du im Abschnitt Funktionen.<br/><br/>
            <span style={{color: "#F2338C", fontSize: "1rem", fontWeight: 700}}>Aber Achtung:</span><br/>
            Trotz dessen, dass WeedStats ein buntes Design und spielerische Elemente verwendet, 
            ist die App ausdrücklich keinesfalls als Ermutigung zum Konsum zu verstehen. 
            Ganz im Gegenteil: solltest du ein ernsthaftes Suchtproblem haben, empfehlen wir dir, 
            professionelle Hilfe aufzusuchen. Solltest du noch nicht volljährig sein, raten wir ebenfalls 
            strengstens sowohl vom Gebrauch der App, als auch vom Konsum ab.
            Sei verantwortungsvoll!
            </p> 
            : 
            <p className="content_text">WeedStats is the daily companion for all cannabis connoisseurs.
            The app offers you options for tracking, evaluating and sharing your consumption.<br/><br/> 
            <span style={{color: "#409FFF"}}> Of course, we let you decide for yourself what you disclose and what not.</span><br/><br/>
            You can find out which other features are available for you in the features section.<br/><br/>
            <span style={{color: "#F2338C", fontSize: "1rem", fontWeight: 700}}>But beware:</span><br/>
            Despite the fact that WeedStats uses a colorful design and playful elements,
             the app is expressly not to be understood as an encouragement to consume.
             On the contrary: if you have a serious addiction problem, we recommend that you
             seek professional help. If you are not yet of legal age, we also advise
             strictly from both the use of the app and consumption.
             Be responsible!
            </p>}

        </div>
    )
}

export default Idea