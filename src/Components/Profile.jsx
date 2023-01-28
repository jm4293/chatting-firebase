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

    useEffect(() => {
        const uid = sessionStorage.getItem("uid");

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
    }, [])

    return (
        <Frame>
            <h1 style={{borderBottom: "1px solid rgb(222, 222, 222)"}}>Profile</h1>
            <User>
                <div>{name}</div>
                <div>{birth}</div>
                <img src={photo}/>
            </User>
            <div>
                {
                    friend.map((element) => {
                        return (
                            <div>
                                <div>{element.name}</div>
                                <div>{element.birth}</div>
                            </div>
                        )
                    })
                }
            </div>
        </Frame>
    )
}

const Frame = styled.div`
  width: 100%;
  height: 86%;
  //border: 1px solid blue;
`;

const User = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  border: 1px solid rgb(222, 222, 222);
`;

const Photo = styled.img`
  width: 10%;
  height: 100%;
  margin: 0 20px;
  border-radius: 30px;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin: auto;
`;

export default Profile;