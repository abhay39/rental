import { createSlice, createStore } from "@reduxjs/toolkit";

const UserInformation=createSlice({
    name:"UserInfo",
    initialState:"",
    reducers:{
        setUserInfo(state,action){
            console.log(action.payload);
            state=action.payload;
            return state;
        },
        removerUserInfo(state,action){
            state=null;
            return state;
        }
    }
})

export const {setUserInfo,removerUserInfo}=UserInformation.actions;

export default UserInformation