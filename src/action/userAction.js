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
    const res = await api.post('/user/login', { email, password })
    console.log("response:", res)
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

const forgetPassword = (nickName, userName, email) => async (dispatch) => {
    try {
        dispatch({ type: types.FORGET_PASSWORD_REQUEST })
        const res =  await api.post('/user/forgetpassword', { nickName, userName, email });
        if (res.status !== 200) {
          throw new Error(res.error)
        } else {
          dispatch({ type: types.FORGET_PASSWORD_SUCCESS, payload: res.data.data })
          dispatch(commonUiActions.showToastMessage('새로 변경할 비밀번호를 입력해주세요', 'success'))
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
          dispatch(commonUiActions.showToastMessage('비밀번호가 변경되었습니다', 'success'));
          navigate('/login');
          dispatch({ type: types.SET_FIND_USER, payload: null })
        }
    } catch (error) {
        dispatch({ type: types.SET_PASSWORD_WHEN_FORGET_FAIL });
        dispatch(commonUiActions.showToastMessage(error.message, 'error'));
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
