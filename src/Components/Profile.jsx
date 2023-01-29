import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {db, storage} from "../Firebase/firebase";
import {doc, getDoc, collection, query, getDocs} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";

function Profile() {
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [photo, setPhoto] = useState("");
    const [friend, setFriend] = useState([]);
    const [uid, setUid] = useState("");

    useEffect(() => {
        const uid = sessionStorage.getItem("uid");
        setUid(uid)

        async function getUser() {
            await getDoc(doc(db, "users", uid))
                .then((result) => {
                    setName(result.data().name)
                    setBirth(result.data().birth)
                })
                .catch((error) => {
                    console.log("Profile getUser error ", error)
                })
        }

        getUser();

        async function getPhoto() {
            await getDownloadURL(ref(storage, uid))
                .then((result) => {
                    setPhoto(result);
                })
                .catch((error) => {
                    console.log("Profile getPhoto error ", error)
                })
        }

        getPhoto();

        async function getFriend() {
            await getDocs(query(collection(db, "users")))
                .then((result) => {
                    result.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data());
                        setFriend(list => [...list, doc.data()])
                    })
                })
                .catch((error) => {
                    console.log("Profile getFriend error ", error)
                })
        }

        getFriend();

        console.log(friend)
    }, [])

    return (
        <Frame>
            <h1>Profile</h1>
            <User>
                <UserPhoto src={photo}/>
                <UserName>
                    <div style={{marginBottom: "5px"}}>이름: {name}</div>
                    <div>생년월일: {birth}</div>
                </UserName>
            </User>
            <div>
                <h2>친구 목록</h2>
                <div>
                    {
                        friend.map((element) => {
                            if (element.uid === uid) {
                                return
                            } else {
                                return (
                                    <Friend>
                                        <div>이름: {element.name}</div>
                                        <div>생년월일: {element.birth}</div>
                                    </Friend>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </Frame>
    )
}

const Frame = styled.div`
  width: 100%;
  height: 86%;
`;

const User = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  margin-bottom: 50px;
  border: 1px solid rgb(222, 222, 222);
`;

const UserPhoto = styled.img`
  //border-radius: 50px;
  margin: 0 20px 0 20px;
`;

const UserName = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid rgb(222, 222, 222);
  padding-left: 20px;
`;

const Friend = styled.div`
  border: 1px solid rgb(222, 222, 222);
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
`;

export default Profile;