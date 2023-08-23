//React
import React, { useState, useContext} from "react";

//Custom Components
import Empty from "../../../common/Empty";
import FriendListItem from "./FriendListItem/FriendListItem";
import CustomLoader from "../../../common/CustomLoader";
import FriendPage from "./FriendListItem/FriendPage/FriendPage";

//Service
import { UserContext } from "../../../../data/UserContext";
import { LanguageContext } from "../../../../data/LanguageContext";
import { useNavigate } from "react-router-dom";


const FriendList = ({ friendList, toggleNavbar, getFriendList, refreshUser }) => {

    //Context
    const user = useContext(UserContext);
    const language = useContext(LanguageContext);

    //navigation
    const navigate = useNavigate()

    //State
    const [loading, setLoading] = useState(false);
    const [showFriend, setShowFriend] = useState(false);
    const [activeFriend, setActiveFriend] = useState(user);
    const [refreshing, setRefreshing] = useState(false);

    return (
        <>
       {/*  {friendList.length != 0 ?
            <FriendPage
                show={showFriend}
                user={activeFriend}
                onExit={() => {setShowFriend(false);}}
                onRemoveFriend={() => {setActiveFriend(null); setShowFriend(false);}}
                refreshUser={refreshUser}
                toggleNavbar={toggleNavbar}
            /> 
        : null} */}

        <div style={styles.container}>
            {!loading ?  
                <>
                    <div>
                        {friendList.length != 0 ?
                        <>
                        {friendList.map((friend) => {
                            return <FriendListItem key={Math.random()} friend={friend} onPress={() => {navigate("/home/friends/" + friend.id) /* setActiveFriend(friend); setShowFriend(true) */}}/>
                        })}

                        </> : <div style={{justifyContent: "center", flex: 1}}>
                                <div style={{height: "2rem"}}></div>
                                <Empty title={language.empty_no_friends_yet} tip={language.empty_tap_the_plus}/>
                            </div>}

                        <div style={{height: "2rem"}}></div>
                    </div>
                </> 
                : 
                <div style={{height: "90%", justifyContent: "center"}}>
                    <CustomLoader x={50} color={"#0080FF"}/>
                </div>}
        </div></>
    );
}

export default FriendList

const styles = {
    container: {
        width: "100%",
        height: "80%",
    }
};