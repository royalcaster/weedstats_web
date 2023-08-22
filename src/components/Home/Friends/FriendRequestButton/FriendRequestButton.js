//React
import React, { useContext, useState } from "react";


//Custom Components
import FriendRequests from './FriendRequests/FriendRequests'
import { UserContext } from "../../../../data/UserContext";

const FriendRequestButton = ({ refreshUser, getFriendList }) => {

    //Context
    const user = useContext(UserContext);

    //State
    const [showRequests, setShowRequests] = useState();
    

    return (<>
        {showRequests ? <FriendRequests onExit={() => setShowRequests(false)} refreshUser={refreshUser} getFriendList={getFriendList}/> : null}

        <div onClick={() => setShowRequests(true)}>
            <div style={styles.touchable}>
                {/* <Feather name="user-check" style={[styles.icon,{color: user.requests.length != 0 ? "#F2338C" : "white"}]} /> */}
            </div>
        </div>
    </>)
}

export default FriendRequestButton

const styles = {
    touchable: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "green",
        backgroundColor: "#1E2132",
      },
    icon: {
        textAlignVertical: "center",
        color: "white",
        fontSize: "2rem",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
};