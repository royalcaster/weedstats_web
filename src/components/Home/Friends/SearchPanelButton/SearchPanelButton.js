//React
import React, { useState } from "react";

//Custom Components
import SearchPanel from './SearchPanel/SearchPanel'

const SearchPanelButton = () => {

    //Context

    //State
    const [showAddFriend, setShowAddFriend] = useState(false);
    

    return (<>
        {showAddFriend ? <SearchPanel onExit={() => setShowAddFriend(false)}/> : null}

        <div onClick={() => setShowAddFriend(true)}>
        <div style={styles.touchable}>
            {/* <Feather name="plus" style={styles.icon} /> */}
        </div>
        </div>
    </>)
}

export default SearchPanelButton

const styles = {
    touchable: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#131520",
        backgroundColor: "#1E2132",
    },
    icon: {
        textAlignVertical: "center",
        color: "white",
        fontSize: "2rem",
        marginLeft: 10,
        marginRight: 20,
        marginBottom: 10
    },
};