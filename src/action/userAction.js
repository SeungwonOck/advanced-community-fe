import api from "../utils/api"
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";

const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOKEN_LOGIN_REQUEST })

    const token = sessionStorage.getItem("token");
    const res = await api.get('/user/token/authentication', {
      headers: {
        token: `${token}`,
      },
    });
    if (res.status !== 200) {
      throw new Error('Invalid token');
    }
    else {
      dispatch({ type: types.TOKEN_LOGIN_SUCCESS, payload: res.data })
    }

  } catch (error) {
    dispatch({ type: types.TOKEN_LOGIN_FAIL, payload: error.message })
    dispatch(logout())
  }
};

const loginWithEmail = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST })
    const res = await api.post('/user/login', { email, password })
    if (res.status !== 200) {
      throw new Error(res.error)
    }
    else {
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data })
      sessionStorage.setItem('token', res.data.data.token)
      dispatch(commonUiActions.showToastMessage(`Welcome ${res.data.data.user.Username}`, "success"))
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

const register = ({ email, username, password_1, password_2, role }, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST })
    const res = await api.post('/user/register', { email, username, password_1, password_2, role })
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
      dispatch(commonUiActions.showToastMessage("정보 수정이 완료되었습니다.", "success"))
    }
  } catch (error) {
    dispatch({ type: types.UPDATE_USER_FAIL, payload: error.message })
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
          dispatch(commonUiActions.showToastMessage('Reset Code Sent to Your Email!', 'success'))
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
  setNewPassword
};
