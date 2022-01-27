import { createSlice } from "@reduxjs/toolkit";
import { commonReducers } from "./commonReducers";
const defaultState = ["05:00", "05:00"];
const tempReducers = commonReducers("Break", defaultState);

export const breakSlice = createSlice({
    name: "break",
    initialState: defaultState,
    reducers: tempReducers
});
export const breakActions = breakSlice.actions; 