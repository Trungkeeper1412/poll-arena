import { getUser, _getUsers } from "../_DATA";

export const GET_USERS_STATUS = "GET_USERS_STATUS";
export const LOGIN_USER_STATUS = "LOGIN_USER_STATUS";
export const LOGOUT_USER = "LOGOUT_USER";

export const getUsersStatus = (status, users = null, error = null) => ({
  type: GET_USERS_STATUS,
  status,
  users,
  error,
});

export const loginUserStatus = (status, user = null, error = null) => ({
  type: LOGIN_USER_STATUS,
  status,
  user,
  error,
});

export const getUsers = () => {
  return (dispatch) => {
    dispatch(getUsersStatus("loading"));

    return _getUsers()
      .then((users) => {
        dispatch(getUsersStatus("success", users));
      })
      .catch((error) => {
        dispatch(getUsersStatus("failure", null, error));
      });
  };
};

export const loginUser = (id, password) => {
  return (dispatch) => {
    dispatch(loginUserStatus("loading"));

    return getUser(id, password)
      .then((user) => {
        dispatch(loginUserStatus("success", user));
      })
      .catch((error) => {
        dispatch(loginUserStatus("failure", null, error.message));
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
    });
  };
};
