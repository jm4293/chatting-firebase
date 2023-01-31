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
    const [number, setNumber] = useState("");
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
            number: number,
            uid: uid
        })
            .then(() => {

            })
            .catch((error) => {
                console.log("Register setDoc error ", error)
            })

        await uploadBytes(ref(storage, uid), picture)
            .then(() => {

            })
            .catch((error) => {
                console.log("Register uploadBytes error ", error)
            })
    }

    return (
        <Frame>
            <Item className="Item1"><h1>Register</h1></Item>
            <Item className="Item2"><Input type="text" onChange={e => setEmail(e.target.value)} placeholder="Email"/></Item>
            <Item className="Item3"><Input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/></Item>
            <Item className="Item4"><Input type="text" onChange={e => setName(e.target.value)} placeholder="Name"/></Item>
            <Item className="Item5"><Input type="text" onChange={e => setNumber(e.target.value)} placeholder="Number"/></Item>
            <Item className="Item6"><input type="file" onChange={e => setPicture(e.target.files[0])} accept="image/*"/></Item>
            <Item className="Item7"><Button onClick={() => signup()}>회원가입</Button></Item>
            <Item className="Item8"><Button onClick={() => navigate('/')}>돌아가기</Button></Item>
        </Frame>
    )
}

const Frame = styled.div`
  width: 98%;
  height: 95%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: repeat(10, 70px);
  align-items: center;
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
  }

  &.Item2 {
    grid-column: 1/4;
    grid-row: 4/5;
  }
  
  &.Item3 {
    grid-column: 1/4;
    grid-row: 5/6;
  }

  &.Item4 {
    grid-column: 1/4;
    grid-row: 6/7;
  }

  &.Item5 {
    grid-column: 1/4;
    grid-row: 7/8;
  }

  &.Item6 {
    //width: 70%;
    grid-column: 1/4;
    grid-row: 8/9;
    //margin-left: 50px;
  }

  &.Item7 {
    grid-column: 1/4;
    grid-row: 9/10;
  }

  &.Item8 {
    grid-column: 1/4;
    grid-row: 10/11;
  }
`;

const Input = styled.input`
  width: 50%;
  height: 50%;
  border: none;
  border-bottom: 1px solid rgb(160, 160, 160);
  font-size: 20px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 50%;
  height: 70%;
  font-size: 16px;
  border: none;
  background-color: rgb(245, 245, 245);
  cursor: pointer;

  &:hover{
    background-color: rgb(234, 234, 234);
  }
`;

export default Register