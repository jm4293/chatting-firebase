import React from "react";
import styled, {createGlobalStyle} from "styled-components";
import {Routes, Route} from "react-router-dom";
import Header from "./Components/Home/Header";
import Profile from "./Components/Profile";
import ChatList from "./Components/ChatList";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Logout from "./Components/Account/Logout";
import Navbar from "./Components/Home/Navbar";

function App() {
    return (
        <Frame>
            <GlobalStyle/>
            <Header/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/chatlist" element={<ChatList/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/logout" element={<Logout/>}/>
            </Routes>
            <Navbar/>
        </Frame>
    )
}

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`;

const Frame = styled.div`
  width: 60vw;
  //min-width: 600px;
  height: 100vh;
  margin: auto;
  
  @media screen and (max-width: 1200px){
    width: 90vw;
  }
`;

export default App;


//http://localhost:8000/kakaotoken
//http://localhost:8000/kakao/callback