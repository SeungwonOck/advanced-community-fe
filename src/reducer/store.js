import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from "./userReducer";
import { campaignReducer } from "./campaignReducer"

const store = configureStore({
    reducer: {
        user: userReducer,
        campaign: campaignReducer,
    },
});

export default store;