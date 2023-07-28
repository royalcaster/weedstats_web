import { useContext, useEffect } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    createRoutesFromElements,
    BrowserRouter,
    Routes
  } from "react-router-dom";
import { UserContext } from "../../data/UserContext";

//Navigation
import { useNavigate } from "react-router-dom";

//Custom Components
import Main from "./Main/Main";
import Empty from "../common/Empty";
  
  const Home = ({ onSetUser, onWriteComplete, friendList, handleLogOut, toggleLanguage, deleteAccount, getFriendList, loadSettings, refreshUser, handleIntroFinish, loadingParent }) => {

    //Context
    const user = useContext(UserContext);

    //Navigation
    const navigate = useNavigate();

    useEffect(() => {
      if (user == null) {
        navigate("/")
      }
      else {
        navigate("/home/counter")
      }
    },[]);

    return (
      
      <>
        {!loadingParent ?
          <Routes>
            <Route exact path="/counter" element={<Main onWriteComplete={onWriteComplete} onSetUser={onSetUser} refreshUser={refreshUser}/>} />
            <Route exact path="/config" element={<Empty title={"lädt config"}/>} />
          </Routes>
          : <Empty title={"loading app"}/>
        }
        
      </>
  
    );
  }
  
  export default Home;
  
  {/* <BrowserRouter>
        <Routes>
          <Route path="login" element={<Users/>} />
        </Routes>
      </BrowserRouter> */}
  