import React, {useState} from "react";
import styled from "styled-components";
import {app, db, storage} from "../../Firebase/firebase";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {ref, uploadBytes} from "firebase/storage";
import {useNavigate} from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [picture, setPicture] = useState("");
    const navigate = useNavigate()

    const signup = async () => {
        let uid = "";
        const auth = getAuth(app);
        await createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                uid = result.user.uid;
                alert("회원가입 성공");
                navigate('/');
            })
            .catch((error) => {
                console.log("Register createUserWithEmailAndPassword error ", error)
                alert("회원가입 실패");
            })

        await setDoc(doc(db, "users", uid), {
            name: name,
            birth: birth,
            uid: uid,
        })
            .catch((error) => {
                console.log("Register setDoc error ", error)
            })

        await uploadBytes(ref(storage, uid), picture)
            .catch((error) => {
                console.log("Register uploadBytes error ", error)
            })
    }

    return (
        <Frame>
            <h1>Register</h1>
            <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Email"/>
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <input type="text" onChange={e => setName(e.target.value)} placeholder="name"/>
            <input type="text" onChange={e => setBirth(e.target.value)} placeholder="birth"/>
            <input type="file" onChange={e => setPicture(e.target.files[0])} accept="image/*"/>
            <button onClick={() => signup()}>회원가입</button>
            <button onClick={() => navigate('/')}>돌아가기</button>
        </Frame>
    )
}

const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Register