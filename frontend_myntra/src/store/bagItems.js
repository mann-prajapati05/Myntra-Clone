import { createSlice } from "@reduxjs/toolkit";

const bagItemsSlice=createSlice({
    name:"bagItemIds",
    initialState:[],
    reducers:{
        bagLoadedFromServer:(state,action)=>{
            console.log("item ids loaded..");
            return state=action.payload.bagItemIds;
        },
        addToBag:(state,action)=>{
            console.log("item id added");
            return state=[...state,action.payload.itemId];
        },
        removeFromBag:(state,action)=>{
            console.log("item id removed");
            return state.filter((item)=>item!=action.payload.itemId);
        }
    }
});

export default bagItemsSlice;