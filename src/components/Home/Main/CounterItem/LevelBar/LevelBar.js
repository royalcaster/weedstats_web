//React
import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../../../../data/LanguageContext";

const LevelBar = ({ index, counter }) => {

    const language = useContext(LanguageContext);
    const [color, setColor] = useState("#484F78")

    const getColor = (level) => {
        if (counter) {
            if (level.key > index) {
                return "#1E2132";
            }
            else{
                return level.colors[0];
            }
        }
        else {
            return "#1E2132";
        }
    }

    const RenderItem = ({ level }) => {  
        return <>
        <div key={level} style={{backgroundColor: getColor(level), flex: 1, margin: 1.5, marginHorizontal: 10, borderRadius: 2.5}}>
        </div>
        </>
    }

    return (
        <div style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            paddingVertical: 10,
            margin: 10
        }}>
            
            {language.levels.slice(0).reverse().map(level => {
                return <RenderItem level={level} key={Math.random()}/>;
            })}

        </div>
    );
}

export default LevelBar