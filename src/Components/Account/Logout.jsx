import React, {useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {app} from "../../Firebase/firebase";
import {getAuth, signOut} from "firebase/auth";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        async function logout() {
            const auth = getAuth(app);
            signOut(auth)
                .then(() => {
                    sessionStorage.removeItem("uid");
                    alert("로그아웃 성공");
                    navigate('/');
                })
                .catch((error) => {
                    alert("로그아웃 실패");
                    console.log("logout error ", error)
                });
        }
        logout();
    }, [])

    return (
        <Frame>
            <h1>잠시만 기다려 주세요! 로그아웃 중입니다!</h1>
        </Frame>
    )
}

const Frame = styled.div`
  width: 100%;
  height: 86%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Logout;