import api from '../utils/api';
import * as types from "../constants/campaign.constants";
import { commonUiActions } from './commonUiAction';
import { type } from '@testing-library/user-event/dist/type';

const createCampaign = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.CAMPAIGN_CREATE_REQUEST })
    const res = await api.post("/campaign", formData);
    dispatch({ type: types.CAMPAIGN_CREATE_SUCCESS })
    dispatch(commonUiActions.showToastMessage("Campaign created successfully", "success"))
    dispatch(getAllCampaigns());
  } catch (error) {
    dispatch({ type: types.CAMPAIGN_CREATE_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
}

const getAllCampaigns = () => async (dispatch) => {
  try {
    dispatch({ type: types.CAMPAIGN_GET_REQUEST });
    const res = await api.get("/campaign/all");
    dispatch({type: types.CAMPAIGN_GET_SUCCESS, payload: res.data.data})
  } catch (error) {
    dispatch({ type: types.CAMPAIGN_GET_FAIL, payload: error.error})
  }
}

const getCampaignDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CAMPAIGN_DETAIL_REQUEST })
    const res = await api.get(`/campaign/${id}`);
    dispatch({ type: types.GET_CAMPAIGN_DETAIL_SUCCESS, payload: res.data.data.campaign})
  } catch (error) {
    dispatch({ type: types.GET_CAMPAIGN_DETAIL_FAIL, payload: error.message })
    dispatch(commonUiActions.showToastMessage(error.message, "error"))
  }
}

const activateCampaign = (campaignId) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CAMPAIGN_ACTIVATE_REQUEST })
    const res = await api.put(`/campaign/activate/${campaignId}`);
    dispatch({ type: types.UPDATE_CAMPAIGN_ACTIVATE_SUCCESS })
    dispatch(commonUiActions.showToastMessage("Campaign Approved!", "success"))
    dispatch(getAllCampaigns());
  } catch (error) {
    dispatch({ type: types.UPDATE_CAMPAIGN_ACTIVATE_FAIL, payload: error.message })
    dispatch(commonUiActions.showToastMessage(error.message, "error"))
  }
}

const deactivateCampaign = (campaignId) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CAMPAIGN_DEACTIVATE_REQUEST })
    const res = await api.put(`/campaign/deactivate/${campaignId}`);
    dispatch({ type: types.UPDATE_CAMPAIGN_DEACTIVATE_SUCCESS })
    dispatch(commonUiActions.showToastMessage("Campaign Denied", "success"))
    dispatch(getAllCampaigns());
  } catch (error) {
    dispatch({ type: types.UPDATE_CAMPAIGN_DEACTIVATE_FAIL, payload: error.message })
    dispatch(commonUiActions.showToastMessage(error.message, "error"))
  }
}

const createComment = (id, newComment) => async (dispatch) => {
    try {
        dispatch({ type: types.CREATE_CAMPAIGN_COMMENT_REQUEST })
        const res = await api.post(`/campaign/comment`, { campaignId: id, content: newComment });
            dispatch({ type: types.CREATE_CAMPAIGN_COMMENT_SUCCESS })
            dispatch(commonUiActions.showToastMessage("Comment is Registered", "success"))
            dispatch(getCampaignDetail(id))
    } catch (error) {
        dispatch({ type: types.CREATE_CAMPAIGN_COMMENT_FAIL, payload: error.message })
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
}

const toggleLike = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_LIKE_ON_CAMPAIGN_REQUEST })
    const res = await api.post("/campaign/like", { campaignId: id });
    dispatch({ type: types.ADD_LIKE_ON_CAMPAIGN_SUCCESS })
    dispatch(getCampaignDetail(id));
  } catch (error) {
    dispatch({ type: types.ADD_LIKE_ON_CAMPAIGN_FAIL, payload: error.message })
    dispatch(commonUiActions.showToastMessage(error.message, "error"))
  }
}



export const campaignActions = {
  createCampaign,
  getAllCampaigns,
  activateCampaign,
  deactivateCampaign,
  getCampaignDetail,
  createComment,
  toggleLike,
};