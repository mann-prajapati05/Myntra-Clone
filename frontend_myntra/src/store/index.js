import {configureStore, createSlice} from '@reduxjs/toolkit';
import itemListSlice from './itemList';
import bagItemsSlice from './bagItems';

export const myStore= configureStore({
    reducer:{
        itemList:itemListSlice.reducer,
        bagItemIds:bagItemsSlice.reducer,
    }
}) 

export const itemListActions= itemListSlice.actions;
export const bagItemsActions= bagItemsSlice.actions;