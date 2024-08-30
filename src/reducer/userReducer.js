import * as types from "../constants/user.constants";
const initialState = {
  loading: false,
  user: null,
  error: '',
  userList: null,
  findUser: null
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.TOKEN_LOGIN_REQUEST:
    case types.GET_USER_LIST_REQUEST:
    case types.UPDATE_USER_REQUEST:
    case types.FORGET_PASSWORD_REQUEST:
    case types.SET_PASSWORD_WHEN_FORGET_REQUEST:
      return { ...state, loading: true }
    case types.LOGIN_SUCCESS:
    case types.TOKEN_LOGIN_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
      return { ...state, loading: false, user: payload.user, error: "" }
    case types.FORGET_PASSWORD_SUCCESS:
      return { ...state, loading: false, findUser: payload, error: '' }
    case types.REGISTER_SUCCESS:
    case types.SET_PASSWORD_WHEN_FORGET_SUCCESS:
      return { ...state, loading: false, error: "" }
    case types.GET_USER_LIST_SUCCESS:
      return { ...state, loading: false, error: "", userList: payload.allUser }
    case types.LOGIN_FAIL:
    case types.REGISTER_FAIL:
    case types.GET_USER_LIST_FAIL:
    case types.UPDATE_USER_FAIL:
    case types.FORGET_PASSWORD_FAIL:
    case types.SET_PASSWORD_WHEN_FORGET_FAIL:
      return { ...state, loading: false, error: payload };
    case types.TOKEN_LOGIN_FAIL:
      return { ...state, loading: false };
    case types.LOGOUT:
      return { ...state, user: null }
    case types.CLEAR_ERROR:
      return { ...state, error: '' }
    case types.SET_FIND_USER:
      return { ...state, findUser: null}

    default:
      return state;
  }
}

export default userReducer;