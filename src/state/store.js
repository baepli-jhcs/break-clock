import { configureStore } from '@reduxjs/toolkit';
import { clockSlice } from './slices/clock';
import { breakSlice } from './slices/break';

const store = configureStore({
    reducer: {
        clockReducer: clockSlice.reducer,
        breakReducer: breakSlice.reducer
    }
});
export default store;