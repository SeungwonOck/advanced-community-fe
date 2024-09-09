import api from '../utils/api';
import * as types from "../constants/campaign.constants";
import { commonUiActions } from './commonUiAction';
import { type } from '@testing-library/user-event/dist/type';

const createCampaign = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.CAMPAIGN_CREATE_REQUEST })
    const res = await api.post("/campaign/create", formData);
    dispatch({ type: types.CAMPAIGN_CREATE_SUCCESS })
    dispatch(commonUiActions.showToastMessage("Campaign created successfully", "success"))
  } catch (error) {
    dispatch({ type: types.CAMPAIGN_CREATE_FAIL, payload: error.error })
    dispatch(commonUiActions.showToastMessage(error.error, "error"))
  }
}

const getCampaignsByOwner = ({ owner_id }) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CAMPAIGNS_BY_OWNER_REQUEST });
    const res = await api.get(`/campaign/get_all_by_owner?owner_id=${owner_id}`)
    console.log("resrs", res)
  } catch (error) {
    dispatch({ type: types.GET_CAMPAIGNS_BY_OWNER_FAIL, payload: error.error });
  }
}

const getAllCampaigns = () => async (dispatch) => {
  try {
    dispatch({ type: types.CAMPAIGN_GET_REQUEST });
    const res = await api.get("/campaign/get_all_by_status");
    dispatch({type: types.CAMPAIGN_GET_SUCCESS})
  } catch (error) {
    dispatch({ type: types.CAMPAIGN_GET_FAIL, payload: error.error})
  }
}

const getCampaignDetail = () => async(dispatch) => {
  try {
    dispatch({ type: types.GET_CAMPAIGN_DETAIL_REQUEST });
    const res = await api.get("/campaign/get");
    dispatch({ type: types.GET_CAMPAIGN_DETAIL_SUCCESS})
  } catch (error) {
    dispatch({ type: types.GET_CAMPAIGN_DETAIL_FAIL, payload: error.error})
  }
}

const createComment = () => async (dispatch) => {
  try {

  } catch (error) {

  }
}

export const campaignActions = {
  createCampaign,
  getCampaignsByOwner,
  getAllCampaigns,
  createComment,
};