import { createSlice } from "@reduxjs/toolkit";

const isAdminSlice=createSlice({
    name:"isAdmin",
    initialState:false,
    reducers:{
        iamAdmin:(state)=>{
            console.log("Admin true");
            return state=true;
        },
        setAdminState:(state, action)=>{
            return state=action.payload;
        }
    }
});

export default isAdminSlice;