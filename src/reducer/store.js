import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userReducer";
import campaignReducer from "./campaignReducer"
import commonUiReducer from './commonUIReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        campaign: campaignReducer,
        ui: commonUiReducer,
    },
});

export default store;