import React from "react";
import styled, {createGlobalStyle} from "styled-components";
import {Routes, Route} from "react-router-dom";
import Header from "./Components/Home/Header";
import Profile from "./Components/Profile";
import ChatList from "./Components/ChatList";
import Chatting from "./Components/Chatting";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Logout from "./Components/Account/Logout";
import Navbar from "./Components/Home/Navbar";

function App() {
    return (
        <Frame>
            <GlobalStyle/>
            <div style={{width: "100%", height: "5%"}}>
                <Header/>
            </div>
            <div style={{width: "100%", height: "85%", overflow: "auto"}}>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/chatlist" element={<ChatList/>}/>
                    <Route path="/chatting/:uid" element={<Chatting/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
            </div>
            <div style={{width: "100%", height: "10%"}}>
                <Navbar/>
            </div>
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
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1200px) {
    width: 90vw;
  }
`;

export default App;