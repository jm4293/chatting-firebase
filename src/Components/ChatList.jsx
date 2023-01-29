import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {doc, getDoc} from "firebase/firestore";
import {db, storage, messaging} from "../Firebase/firebase";
import {getDownloadURL, ref} from "firebase/storage";

function ChatList() {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        const uid = sessionStorage.getItem("uid");

        async function getUser() {
            await getDoc(doc(db, "users", uid))
                .then((result) => {
                    setName(result.data().name)
                })
                .catch((error) => {
                    console.log("ChatList getUser error ", error)
                })
        }

        getUser();

        async function getPhoto() {
            await getDownloadURL(ref(storage, uid))
                .then((result) => {
                    setPhoto(result);
                })
                .catch((error) => {
                    console.log("ChatList getPhoto error ", error)
                })
        }

        getPhoto();
        
    }, [])

    return (
        <Frame>
            <h1 style={{borderBottom: "1px solid rgb(222, 222, 222)"}}>Chatting</h1>
            <div>{name}</div>
            {/*<img src={photo}/>*/}
        </Frame>
    )
}

const Frame = styled.div`
  width: 100%;
  height: 100%;
`;

const Photo = styled.img`
  width: 10%;
  height: 10%;
  margin: 0 20px;
  border-radius: 30px;
`;

export default ChatList

