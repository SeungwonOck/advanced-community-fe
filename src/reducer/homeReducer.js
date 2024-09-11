import * as types from "../constants/home.constants";
const initialState = {
  loading: false,
  error: "",
  homeCampaign: [],
}

function homeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_HOME_DATA_REQUEST:
      return { ...state, loading: true }
    
    case types.GET_HOME_DATA_SUCCESS:
      return { ...state, loading: false, homeCampaign: payload.homeCampaign, error: "" }
    
    case types.GET_HOME_DATA_FAIL:
      return { ...state, loading: false, error: payload };
    
    default:
      return state;
  }
}
export default homeReducer;