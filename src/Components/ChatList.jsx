import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db, storage, messaging} from "../Firebase/firebase";
import {getDownloadURL, ref} from "firebase/storage";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RxMagnifyingGlass} from "react-icons/rx";
import {BsPlusCircle} from "react-icons/bs";
import {HiOutlineMusicNote} from "react-icons/hi";
import {AiOutlineSetting} from "react-icons/ai";

function ChatList() {
    // const [name, setName] = useState("");
    const [list, setList] = useState([]);
    const navigate = useNavigate()

    const name = useSelector((state) => {
        return state.name.name;
    })

    useEffect(() => {
        const uid = sessionStorage.getItem("uid");

        async function getUser() {
            return await getDoc(doc(db, "users", uid))
        }

        getUser()
            .then((result) => {
                // console.log(result)
                // setName(result.data().name)
                // setNumber(result.data().number)
            })
            .catch((error) => {
                console.log("Profile getUser error ", error)
            })

        async function getChatList() {
            return await getDocs(collection(db, `chatList-${sessionStorage.getItem("uid")}`))
        }

        getChatList()
            .then((result) => {
                result.forEach((doc) => {
                    setList(list => [...list, doc.id]);
                })
            })
            .catch((error) => {
                console.log("ChatList getChatList error ", error)
            })
    }, [])

    return (
        <Frame>
            <Header>
                <div style={{display: "flex", alignItems: "center"}}>
                    <h1>Chats</h1>
                    <div style={{flexGrow: "1"}}></div>
                    <RxMagnifyingGlass style={{transform: "scale(1.5)", marginRight: "40px"}}/>
                    <BsPlusCircle style={{transform: "scale(1.5)", marginRight: "40px"}}/>
                    <HiOutlineMusicNote style={{transform: "scale(1.5)", marginRight: "40px"}}/>
                    <AiOutlineSetting style={{transform: "scale(1.5)"}}/>
                </div>
                <div>{`접속한 아이디: ${name} (${sessionStorage.getItem("uid")})`}</div>
            </Header>
            <ListWrap>
                {
                    list.map((element) => {
                        return (
                            <List onClick={() => navigate(`/chatting/${element}`)}>
                                {
                                    <div>
                                        <div>{element}</div>
                                    </div>
                                }
                            </List>
                        )
                    })
                }
            </ListWrap>
        </Frame>
    )
}

const Frame = styled.div`
  width: 98%;
  height: 95%;
`;

const Header = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(200, 200, 200);
`;

const ListWrap = styled.div`
  margin: auto;
  width: 90%;
`;

const List = styled.div`
  margin: 20px 0;
  padding: 20px;
  border-bottom: 1px solid rgb(222, 222, 222);
  cursor: pointer;
`;

export default ChatList

