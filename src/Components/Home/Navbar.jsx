import React from "react";
import styled from "styled-components";
import {BsPerson, BsPersonFill, BsChat, BsFillChatFill} from "react-icons/bs"
import {AiOutlineSearch} from "react-icons/ai"
import {BiDotsHorizontalRounded} from "react-icons/bi"
import {useNavigate} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return(
        <Frame>
            <Button onClick={() => sessionStorage.getItem("uid")===null ? alert("로그인 해주세요") : navigate('/profile')}><BsPerson/></Button>
            <Button onClick={() => sessionStorage.getItem("uid")===null ? alert("로그인 해주세요") : navigate('/chatlist')}><BsChat/></Button>
            <Button><AiOutlineSearch/></Button>
            <Button onClick={() => sessionStorage.getItem("uid")===null ? alert("로그인 해주세요") : navigate('/logout')}><BiDotsHorizontalRounded/></Button>
        </Frame>
    )
}

const Frame = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(249, 249, 250);
  border-top: 1px solid rgb(226, 226, 226);
`;

const Button = styled.div`
  cursor: pointer;
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Navbar