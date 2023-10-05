import React from "react";

const GetTheApp = ({ language }) => {
    return (
        <div className="content_container" style={{backgroundColor: "#409FFF"}} id="gettheapp">

            <p className="content_heading">{language.get_the_app_heading}</p>

            <p className="content_text">{language.get_the_app_text}</p>

        </div>
    )
}

export default GetTheApp