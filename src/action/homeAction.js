import api from '../utils/api';
import * as types from "../constants/home.constants";

const getHomeCampaignData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_HOME_DATA_REQUEST })
    const res = await api.get("/home");
    if (res.status !== 200) {
      throw new Error("Failed to load the data")
    } else {
      dispatch({ type: types.GET_HOME_DATA_SUCCESS, payload: res.data.data });
    }
  } catch (error) {
    dispatch({ type: types.GET_HOME_DATA_FAIL, payload: error.message });
  };
}

export const homeActions = {
  getHomeCampaignData,
}