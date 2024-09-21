import api from "../utils/api"
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";

const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOKEN_LOGIN_REQUEST })
    const res = await api.get('/user');
    if (res.status !== 200) {
      throw new Error('Invalid token');
    }
    else {
      dispatch({ type: types.TOKEN_LOGIN_SUCCESS, payload: res.data.data })
    }

  } catch (error) {
    dispatch({ type: types.TOKEN_LOGIN_FAIL, payload: error.message })
    dispatch(logout())
  }
};

const loginWithEmail = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST })
    const res = await api.post('/auth/login', { email, password })
    if (res.status !== 200) {
      throw new Error(res.error)
    }
    else {
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data })
      sessionStorage.setItem('token', res.data.data.token)
      dispatch(commonUiActions.showToastMessage(`Welcome ${res.data.data.user.userName}`, "success"))
    }

  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL, payload: error.message })
    dispatch(commonUiActions.showToastMessage(error.message, "error"))
  }
};

const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT });
  sessionStorage.removeItem('token');
};

const register = ({ email, userName, password, role }, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST })
    const res = await api.post('/user', { email, userName, password, role })
    if (res.status !== 200) {
      throw new Error(res.error)
    }
    else {
      dispatch({ type: types.REGISTER_SUCCESS })
      dispatch(commonUiActions.showToastMessage("Register Successed", "success"))
      navigate('/login')
    }

  } catch (error) {
    dispatch({ type: types.REGISTER_FAIL, payload: error.message })
    dispatch(commonUiActions.showToastMessage(error.message, "error"))
  }
};

const clearError = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};

const updateUser = (userFormData) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_USER_REQUEST })
    const res = await api.put('/user', userFormData);
    if (res.status !== 200) {
      throw new Error(res.error)
    }
    else {
      dispatch({ type: types.UPDATE_USER_SUCCESS, payload: res.data.data })
      dispatch(commonUiActions.showToastMessage("User Profile Updated.", "success"))
    }
  } catch (error) {
    dispatch({ type: types.UPDATE_USER_FAIL, payload: error.message })
    dispatch(commonUiActions.showToastMessage(error.message, "error"))
  }
};

const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: types.FORGET_PASSWORD_REQUEST })
        const res =  await api.post('/user/forgetpassword', { email });
        if (res.status !== 200) {
          throw new Error(res.error)
        } else {
          dispatch({ type: types.FORGET_PASSWORD_SUCCESS, payload: res.data.data })
          dispatch(commonUiActions.showToastMessage("Please type new password", 'success'))
        }
    } catch (error) {
        dispatch({ type: types.FORGET_PASSWORD_FAIL })
        dispatch(commonUiActions.showToastMessage(error.message, 'error'))
    }
}

const setNewPassword = (userId, password, navigate) => async (dispatch) => {
    try {
        dispatch({ type: types.SET_PASSWORD_WHEN_FORGET_REQUEST })
        const res =  await api.post('/user/resetpassword', { userId, password })
        if (res.status !== 200) {
          throw new Error(res.error)
        } else {
          dispatch({ type: types.SET_PASSWORD_WHEN_FORGET_SUCCESS });
          dispatch(commonUiActions.showToastMessage("Password Changed!", "success"));
          navigate('/login');
          dispatch({ type: types.SET_FIND_USER, payload: null })
        }
    } catch (error) {
        dispatch({ type: types.SET_PASSWORD_WHEN_FORGET_FAIL });
        dispatch(commonUiActions.showToastMessage(error.message, "error"));
    }
}

export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  updateUser,
  register,
  clearError,
  forgetPassword,
  setNewPassword,
};
