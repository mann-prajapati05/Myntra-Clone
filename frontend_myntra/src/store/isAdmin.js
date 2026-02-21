import { createSlice } from "@reduxjs/toolkit";

const isAdminSlice=createSlice({
    name:"isAdmin",
    initialState:false,
    reducers:{
        setAdminState:(state, action)=>{
            return state=action.payload;
        }
    }
});

export default isAdminSlice;