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
                        alert("비밀번호 6자리 이상 또는 비밀번호 잘못 입력");
                        break;
                    case 'auth/invalid-email' :
                        alert("이메일 잘못 일력");
                        break;
                    case 'auth/user-not-found' :
                        alert("없는 이메일");
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
            <h1>Welcome to KakaoTalk</h1>
            <div>if you have a Kakao Accout,</div>
            <div>log in with your email</div>
            <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Email"/>
            <input type="text" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <button onClick={() => sign_in()}>Log In</button>
            <button onClick={() => navigate('/register')}>Sign Up</button>
            <div>Find Kakao Account or Password</div>
        </Frame>
    )
}

const Frame = styled.div`
  width: 100%;
  height: 86%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Login;