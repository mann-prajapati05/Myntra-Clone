import { createSlice } from "@reduxjs/toolkit";

const itemListSlice=createSlice({
    name:"itemList",
    initialState:[],
    reducers:{
        itemsFromServer : (state,action)=>{
            //console.log("item from server!!");
            state=action.payload.items;
            //console.log("i am new state",state);
            return state;
        } ,
        removeItem :(state,action) =>{
            return state=state.filter(item=> item._id!=action.payload.pid);
        }
    }
});
export default itemListSlice;