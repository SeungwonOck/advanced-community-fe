import * as types from "../constants/campaign.constants";

const initialState = {
  loading: false,
  error: "",
  campaignList: [],
  selectedCampaign: null,
}

function campaignReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CAMPAIGN_CREATE_REQUEST:
    case types.CAMPAIGN_GET_REQUEST:
      return { ...state, loading: true }
    case types.CAMPAIGN_CREATE_SUCCESS:
      return { ...state, loading: false, error: "" }
    case types.CAMPAIGN_GET_SUCCESS:
      return { ...state, loading: false, error: ""}
    case types.CAMPAIGN_CREATE_FAIL:
    case types.CAMPAIGN_GET_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state;
  }
}

export default campaignReducer;