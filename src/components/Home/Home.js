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
  
  const Home = ({ onSetUser, onWriteComplete, friendList, handleLogOut, toggleLanguage, deleteAccount, getFriendList, loadSettings, refreshUser, handleIntroFinish }) => {

    //Context
    const user = useContext(UserContext);

    //Navigation
    const navigate = useNavigate();

    useEffect(() => {
      if (user == null) {
        navigate("/")
      }
    },[]);

    return (
      
      <>
        <Routes>
          <Route path="/counter" element={<Main onWriteComplete={onWriteComplete} onSetUser={onSetUser} refreshUser={refreshUser}/>} />
        </Routes>
      </>
  
    );
  }
  
  export default Home;
  
  {/* <BrowserRouter>
        <Routes>
          <Route path="login" element={<Users/>} />
        </Routes>
      </BrowserRouter> */}
  