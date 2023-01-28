import {configureStore, createSlice} from "@reduxjs/toolkit";
// 사용자 고유 번호
let uid = createSlice({
    name: "uid",
    initialState: {uid: ""},
    reducers: {
        setUid(state, action) {
            state.uid = action.payload;
        },
        setUidClear(state) {
            state.uid = "";
        }
    }
})
export let {setUid, setUidClear} = uid.actions;

// 사용자 이름
let name = createSlice({
    name: "name",
    initialState: {name: ""},
    reducers: {
        setName(state, action){
            state.name = action.payload;
        }
    }
})
export let {setName} = name.actions;

// 사용자 사진
let picture = createSlice({
    name: "picture",
    initialState: {picture: ""},
    reducers: {
        setPicture(state, action){
            state.picture = action.payload;
        }
    }
})
export let {setPicture} = picture.actions;

export default configureStore({
    reducer: {
        uid: uid.reducer,
        name: name.reducer,
        picture: picture.reducer,
    }
})