import { createSlice } from "@reduxjs/toolkit";

const bagItemsSlice=createSlice({
    name:"bagItems",
    initialState:[],
    reducers:{
        addToBag:(state,action)=>{
            console.log("item added");
            return state=[...state,action.payload.item];
        },
        removeFromBag:(state,action)=>{
            console.log("item removed");
            return state.filter((item)=>item.id!=action.payload.itemId);
        }
    }
});

export default bagItemsSlice;