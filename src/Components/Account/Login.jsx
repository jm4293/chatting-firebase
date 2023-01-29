import React, {useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {app} from "../../Firebase/firebase";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const sign_in = async () => {
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                sessionStorage.setItem("uid", result.user.uid);
                alert("로그인 되었습니다.");
                navigate('/profile');
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/wrong-password' :
                        alert("비밀번호 6자리 이상 또는 일치하는 비밀번호 없습니다");
                        break;
                    case 'auth/invalid-email' :
                        alert("잘못된 이메일 입니다.");
                        break;
                    case 'auth/user-not-found' :
                        alert("없는 계정 입니다.");
                        break;
                    case 'auth/too-many-requests' :
                        alert("너무 많은 요청 잠시만 기다려 주세요");
                        break;
                    case 'auth/email-already-in-use' :
                        alert("이미 존재하는 아이디 입니다");
                        break;
                    default:
                        break;
                }
            })
    }

    return (
        <Frame>
            <Item className="Item1"><h1>Welcome to KakaoTalk</h1></Item>
            <Item className="Item2"><h3>if you have a Kakao Accout,<div>log in with your email</div></h3></Item>
            <Item className="Item3"><Input type="text" onChange={e => setEmail(e.target.value)} placeholder="Email"/></Item>
            <Item className="Item4"><Input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/></Item>
            <Item className="Item5"><Button onClick={() => sign_in()}>Log In</Button></Item>
            <Item className="Item6"><Button onClick={() => navigate('/register')}>Sign Up</Button></Item>
            <Item className="Item7"><h4>Find Kakao Account or Password</h4></Item>
        </Frame>
    )
}

const Frame = styled.div`
  width: 100%;
  height: 86%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: repeat(auto-fill, 80px);
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.Item1 {
    grid-column: 2/3;
    grid-row: 2/3;
    margin: auto 0 0 0 ;
  }
  
  &.Item2 {
    grid-column: 2/3;
    grid-row: 3/4;
    //margin-top: auto;
    color: rgb(138, 138, 138);
    
    & h3 > div {
      text-align: center;
    }
  }

  &.Item3 {
    //grid-column-end: span 4;
    grid-column: 1/4;
    grid-row: 5/6;
  }

  &.Item4 {
    //grid-column-end: span 4;
    grid-column: 1/4;
    grid-row: 6/7;
  }

  &.Item5 {
    //grid-column-end: span 4;
    grid-column: 1/4;
    grid-row: 7/8;
  }

  &.Item6 {
    //grid-column-end: span 4;
    grid-column: 1/4;
    grid-row: 8/9;
  }

  &.Item7 {
    grid-column: 2/3;
    grid-row: 9/10;
  }
`;

const Input = styled.input`
  width: 50%;
  height: 50%;
  border: none;
  border-bottom: 1px solid rgb(160, 160, 160);
  font-size: 20px;
  cursor: pointer;
  //padding-left: 20px;
`;

const Button = styled.button`
  width: 50%;
  height: 70%;
  font-size: 16px;
  border: none;
  background-color: rgb(245, 245, 245);
  cursor: pointer;
`;

export default Login;