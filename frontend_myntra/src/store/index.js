import {configureStore, createSlice} from '@reduxjs/toolkit';
import itemListSlice from './itemList';
import bagItemsSlice from './bagItems';
import isAdminSlice from './isAdmin';

export const myStore= configureStore({
    reducer:{
        itemList:itemListSlice.reducer,
        bagItemIds:bagItemsSlice.reducer,
        isAdmin:isAdminSlice.reducer,
    }
}) 

export const itemListActions= itemListSlice.actions;
export const bagItemsActions= bagItemsSlice.actions;
export const isAdminActions= isAdminSlice.actions;