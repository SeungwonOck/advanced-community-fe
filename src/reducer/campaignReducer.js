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
    case types.GET_CAMPAIGN_DETAIL_REQUEST:
    case types.UPDATE_CAMPAIGN_ACTIVATE_REQUEST:
    case types.UPDATE_CAMPAIGN_DEACTIVATE_REQUEST:
    case types.CREATE_CAMPAIGN_COMMENT_REQUEST:
    case types.ADD_LIKE_ON_CAMPAIGN_REQUEST:
      return { ...state, loading: true }
    case types.CAMPAIGN_CREATE_SUCCESS:
    case types.UPDATE_CAMPAIGN_ACTIVATE_SUCCESS:
    case types.UPDATE_CAMPAIGN_DEACTIVATE_SUCCESS:
    case types.CREATE_CAMPAIGN_COMMENT_SUCCESS:
    case types.ADD_LIKE_ON_CAMPAIGN_SUCCESS:
      return { ...state, loading: false, error: "" }
    case types.CAMPAIGN_GET_SUCCESS:
      return { ...state, loading: false, campaignList: payload.allCampaign, error: ""}
    case types.GET_CAMPAIGN_DETAIL_SUCCESS:
      return { ...state, loading: false, selectedCampaign: payload, error: ""}
    case types.CAMPAIGN_CREATE_FAIL:
    case types.CAMPAIGN_GET_FAIL:
    case types.GET_CAMPAIGN_DETAIL_FAIL:
    case types.UPDATE_CAMPAIGN_ACTIVATE_FAIL:
    case types.UPDATE_CAMPAIGN_DEACTIVATE_FAIL:
    case types.CREATE_CAMPAIGN_COMMENT_FAIL:
    case types.ADD_LIKE_ON_CAMPAIGN_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state;
  }
}

export default campaignReducer;