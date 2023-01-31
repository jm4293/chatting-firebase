import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import styled from "styled-components";
import {db, storage} from "../Firebase/firebase";
import {doc, getDoc, collection, query, where, getDocs, setDoc, Timestamp, serverTimestamp, addDoc} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";
import {useSelector} from "react-redux";

function Chatting() {
    const [message, setMessage] = useState("");
    const [list, setList] = useState([]);

    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");

    const params = useParams();


    const name = useSelector((state) => {
        return state.name.name;
    })

    useEffect(() => {
        // 메세지 내용 가져오기
        async function getChatList() {
            return await getDocs(query(collection(db, `message-${sessionStorage.getItem("uid")}`), where("receive", "==", params.uid)));
        }

        getChatList()
            .then((result) => {
                result.forEach((doc) => {
                    // console.log(doc.id)
                    // setList(list => [...list, doc.id]);
                    setList(list => [...list, doc.data()]);
                })
            })
            .catch((error) => {
                console.log("Chatting getChatList error ", error)
            })
    }, [])

    useEffect(() => {
        // 발신자 이름
        async function senderName() {
            return await getDocs(query(collection(db, "users"), where("uid", "==", sessionStorage.getItem("uid"))))
        }

        senderName()
            .then((result) => {
                result.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data().name);
                    setSender(doc.data().name)
                })
                // console.log("4352524", result)
            })
            .catch((error) => {
                console.log("Chatting getDocs(query) error", error)
            })


        // 수신자 이름
        async function receiverName() {
            return await getDocs(query(collection(db, "users"), where("uid", "==", params.uid)))
        }

        receiverName()
            .then((result) => {
                result.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data().name);
                    setReceiver(doc.data().name);
                })
                // console.log("4352524", result)
            })
            .catch((error) => {
                console.log("Chatting getDocs(query) error", error)
            })
    }, [])


    const sendMessage = async () => {
        // 발신자 이름
        // await getDocs(query(collection(db, "users"), where("uid", "==", sessionStorage.getItem("uid"))))
        //     .then((result) => {
        //         result.forEach((doc) => {
        //             // console.log(doc.id, " => ", doc.data().name);
        //             setSender(doc.data().name)
        //         })
        //         // console.log("4352524", result)
        //     })
        //     .catch((error) => {
        //         console.log("Chatting getDocs(query) error", error)
        //     })

        // 발신자 채팅 리스트
        await setDoc(doc(db, `chatList-${sessionStorage.getItem("uid")}`, `${params.uid}`), {})

        // 발신자 메세지 저장
        await addDoc(collection(db, `message-${sessionStorage.getItem("uid")}`), {
            text: message,
            time: serverTimestamp(),
            receive: params.uid
        })
            .then(() => {
                console.log("발신자 성공")
            })
            .catch((error) => {
                console.log("발신자 error", error);
            })

        // 수신자 이름
        // await getDocs(query(collection(db, "users"), where("uid", "==", params.uid)))
        //     .then((result) => {
        //         result.forEach((doc) => {
        //             // console.log(doc.id, " => ", doc.data().name);
        //             setReceiver(doc.data().name);
        //         })
        //         // console.log("4352524", result)
        //     })
        //     .catch((error) => {
        //         console.log("Chatting getDocs(query) error", error)
        //     })

        // 수신자 채팅 리스트
        await setDoc(doc(db, `chatList-${params.uid}`, `${sessionStorage.getItem("uid")}`), {})

        // 수신자 메시지 저장
        await addDoc(collection(db, `message-${params.uid}`), {
            text: message,
            time: serverTimestamp(),
            receive: sessionStorage.getItem("uid")
        })
            .then(() => {
                console.log("수신자 성공")
            })
            .catch((error) => {
                console.log("수신자 error", error);
            })

        setMessage("");
    }

    return (
        <Frame>
            <Header>
                {/*<div>나: {sessionStorage.getItem("uid")}</div>*/}
                <div>{`발산자: ${name} (${sessionStorage.getItem("uid")})`}</div>
                <div>{`수신자: ${receiver} (${params.uid})`}</div>
            </Header>
            {/*<div>{sender}</div>*/}
            {/*<div>{receiver}</div>*/}
            <ListWrap>
                {
                    list.map((element) => {
                        return (
                            <List>
                                {
                                    <div>
                                        <div>{(new Date(element.time.seconds * 1000)).toString()}</div>
                                        <div>{element.receive}</div>
                                        <div>{element.text}</div>
                                        {/*<div>{element}</div>*/}
                                    </div>
                                }
                            </List>
                        )
                    })
                }
            </ListWrap>
            <InputWrap>
                <Input type="text" onChange={e => setMessage(e.target.value)}/>
                <Button onClick={() => sendMessage()}>전송</Button>
            </InputWrap>
        </Frame>
    )
}

const Frame = styled.div`
  width: 99%;
  height: 95%;
`;

const Header = styled.div`
  width: 100%;
  height: 5%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(222, 222, 222);
`;

const ListWrap = styled.div`
  margin: auto;
  width: 90%;
  height: 85%;
`;

const List = styled.div`
  margin: 20px 0;
  padding: 10px;
  border-bottom: 1px solid rgb(222, 222, 222);
  cursor: pointer;
`;

const InputWrap = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 50%;
`;

const Button = styled.button`
  border: none;
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    background-color: rgb(205, 205, 205);
  }
`;

export default Chatting