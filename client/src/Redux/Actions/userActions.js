import * as userConstants from "../Constants/userConstants";
import * as songConstants from "../Constants/SongConstants";
import * as albumConstants from "../Constants/albumConstants";
import * as userApi from "../APIs/userServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// login action
const loginAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(data);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

// register action
const registerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(data);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

// logout action
const logoutAction = () => async (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_LOGIN_RESET });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
  dispatch({ type: userConstants.DELETE_FAVORITE_SONGS_RESET });
  dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET });
  dispatch({ type: userConstants.USER_DELETE_PROFILE_RESET });
  dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET });
  dispatch({ type: userConstants.GET_FAVORITE_SONGS_RESET });
  dispatch({ type: userConstants.GET_ALL_USERS_RESET });
  dispatch({ type: userConstants.DELETE_USER_RESET });
  dispatch({ type: userConstants.LIKE_SONG_RESET });
  dispatch({ type: songConstants.SONGS_DETAILS_RESET });
  dispatch({ type: songConstants.CREATE_REVIEW_RESET });
  dispatch({ type: songConstants.CREATE_SONG_RESET });
  dispatch({ type: songConstants.RESET_ARTIST });
  dispatch({ type: songConstants.UPDATE_SONG_RESET });
  dispatch({ type: albumConstants.CREATE_ALBUM_RESET });
  dispatch({ type: albumConstants.UPDATE_ALBUM_RESET });
  dispatch({ type: albumConstants.DELETE_ALBUM_RESET });
};

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userApi.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    toast.success("Profile Updated");
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

// delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    await userApi.deleteProfileService(tokenProtection(getState));
    dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
    toast.success("Profile Deleted");
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
  }
};

// change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await userApi.changePasswordService(
      passwords,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
  }
};

// get all favorite songs action
const getFavoriteSongsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_FAVORITE_SONGS_REQUEST });
    const response = await userApi.getFavoriteSongs(tokenProtection(getState));
    dispatch({
      type: userConstants.GET_FAVORITE_SONGS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_FAVORITE_SONGS_FAIL);
  }
};

// delete all favorite songs action
const deleteFavoriteSongsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_FAVORITE_SONGS_REQUEST });
    await userApi.deleteFavoriteSongs(tokenProtection(getState));
    dispatch({ type: userConstants.DELETE_FAVORITE_SONGS_SUCCESS });
    toast.success("All Favorite Songs Deleted");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_FAVORITE_SONGS_FAIL);
  }
};

// user like song action
const likeSongAction = (songId) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.LIKE_SONG_REQUEST });
    const response = await userApi.likeSongService(
      songId,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.LIKE_SONG_SUCCESS,
      payload: response,
    });
    toast.success("Added to your favorites");
    dispatch(getFavoriteSongsAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.LIKE_SONG_FAIL);
  }
};

// admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    const response = await userApi.getAllUsersService(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_ALL_USERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

// admin delete user action
const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    await userApi.deleteUserService(id, tokenProtection(getState));
    dispatch({
      type: userConstants.DELETE_USER_SUCCESS,
    });
    toast.success("User Deleted");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);
  }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
  getFavoriteSongsAction,
  deleteFavoriteSongsAction,
  likeSongAction,
  getAllUsersAction,
  deleteUserAction,
};
