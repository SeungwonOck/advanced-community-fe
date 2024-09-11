import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userReducer";
import campaignReducer from "./campaignReducer";
import commonUiReducer from './commonUIReducer';
import homeReducer from "./homeReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        campaign: campaignReducer,
        ui: commonUiReducer,
        home: homeReducer,
    },
});

export default store;