import axios from 'axios';
import * as types from '../constants/authTypes';

/**
 * Logs out the user
 * @returns {{type: string}}
 */
export const logoutUser = () => {
    localStorage.removeItem('token');
    return { type: types.LOGOUT };
};

/**
 * Ajax request to fetch current user info
 * @param token
 */
export const userInfo = token =>
    (dispatch) => {
        axios.get('',
            {
                headers: { authorization: `Bearer${token}` },
            })
            .then((response) => {
                dispatch({
                    type: types.USER_INFO,
                    payload: response.data.data,
                });
                console.log(response);
                // browserHistory.push('/');
            })
            .catch(() => {
                dispatch(logoutUser());
            });
    };

/**
 * Login the user
 * @param email
 * @param password
 */
export const loginUser = ({ email, password }) =>
    (dispatch) => {
        axios.post('', { email, password })
            .then((response) => {
                dispatch({
                    type: types.LOGIN_TOKEN,
                    payload: response.data.data,
                });
                localStorage.setItem('token', response.data.data);
                dispatch({ type: types.AUTHENTICATE });
                dispatch(userInfo(response.data.data));
            })

            .catch((error) => {
                // dispatch(authError("Empty Required Field"));
                console.log(error);
            });
    };
