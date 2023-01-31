import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {db, storage} from "../Firebase/firebase";
import {doc, getDoc, collection, query, getDocs, setDoc} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setName, setNumber} from "../store/store";

function Profile() {
    const [photo, setPhoto] = useState("");
    const [friend, setFriend] = useState([]);
    const navigate = useNavigate();

    const name = useSelector((state) => {
        return state.name.name;
    })

    const number = useSelector((state) => {
        return state.number.number;
    })

    const dispatch = useDispatch();

    useEffect(() => {
        const uid = sessionStorage.getItem("uid");

        async function getUser() {
            return await getDoc(doc(db, "users", uid))
        }

        getUser()
            .then((result) => {
                dispatch(setName(result.data().name))
                dispatch(setNumber(result.data().number))
            })
            .catch((error) => {
                console.log("Profile getUser error ", error)
            })

        async function getPhoto() {
            return await getDownloadURL(ref(storage, uid))

        }

        getPhoto()
            .then((result) => {
                setPhoto(result);
            })
            .catch((error) => {
                console.log("Profile getPhoto error ", error)
            })

        async function getFriend() {
            return await getDocs(query(collection(db, "users")))
        }

        getFriend()
            .then((result) => {
                result.forEach((doc) => {
                    setFriend(list => [...list, doc.data()])
                })
            })
            .catch((error) => {
                console.log("Profile getFriend error ", error)
            })
    }, [])

    return (
        <Frame>
            <h1>Profile</h1>
            <User>
                <UserPhoto src={photo}/>
                <UserName>
                    <div  style={{marginBottom: "5px"}}>이름: <span style={{fontWeight: "600px"}}>{name}</span> </div>
                    <div>번호: {number}</div>
                </UserName>
            </User>
            <div>
                <h2>친구 목록</h2>
                <FriendWrap>
                    {
                        friend.map((element) => {
                            if (element.uid === sessionStorage.getItem("uid")) {
                                return
                            } else {
                                return (
                                    <Friend onClick={() => navigate(`/chatting/${element.uid}`)}>
                                        <div>이름: {element.name}</div>
                                        <div>번호: {element.number}</div>
                                    </Friend>
                                )
                            }
                        })
                    }
                </FriendWrap>
            </div>
        </Frame>
    )
}

const Frame = styled.div`
  width: 99%;
  height: 95%;
`;

const User = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  margin-bottom: 50px;
`;

const UserPhoto = styled.img`
  margin: 0 20px 0 20px;
`;

const UserName = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
`;

const FriendWrap = styled.div`
  width: 90%;
  margin: auto;
`;

const Friend = styled.div`
  border-bottom: 1px solid rgb(222, 222, 222);
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
`;

export default Profile;