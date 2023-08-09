//React
import react, { useContext, useEffect } from "react";
import { LanguageContext } from "../../data/LanguageContext";
import Button from "./Button";

//Custom Components
import ProfileImage from "./ProfileImage";

const ProfileImagePanel = ({ url, onExit }) => {

    const language = useContext(LanguageContext);

    const getHighResUrl = () => {
       return url.substring(0, url.length - 4) + "800-c";
    }

    return <div style={{flex: 1, backgroundColor: "#1E2132", justifyContent: "center"}}>
        <ProfileImage url={getHighResUrl()} x={"600px"}/>
        <div style={{height: "5%"}}></div>
        <Button title={language.account_delete_account_cancel} onPress={() => onExit()} color={"#484F78"} fontColor={"white"}/>
    </div>
}

export default ProfileImagePanel