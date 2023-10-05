import React, { useEffect } from "react";

const LanguageSelector = ({ language, toggleLanguage }) => {

    useEffect(() => {
        console.debug(language);
    });

    return (
        <div className="language_selector_container" onClick={toggleLanguage}>
        <img 
            src={language.short == "de" ? require('../../../../../data/img/de.png') : require('../../../../../data/img/gb.png')}
            className="language_img"
        />
        </div>
    )
}

export default LanguageSelector