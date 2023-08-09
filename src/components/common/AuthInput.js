import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './AuthInput.css'

const AuthInput = ({ label, onBlur, type, value, onChange }) => {

    const [showLabel, setShowLabel ] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        if (text == "") {
            setShowLabel(false)
          }
          else {
            setShowLabel(true);
          }
    }, [text]);

    return (
        <>
            <p className={"label_" + showLabel}>{label}</p>
            <div className={"input_container"}>
                <input autoFocus placeholder={label} onBlur={onBlur} type={type} className="textinput"  value={value} onChange={(e) => {onChange(e.target.value); setText(e.target.value)}}/>
            </div>
        </>
    );
}

export default AuthInput