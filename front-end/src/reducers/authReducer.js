import * as types from '../constants/authTypes';

const INITIAL_STATE = {
    authenticated: false,
    userInfo: null,
    token: '',
};
export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.USER_INFO:
            return { ...state, userInfo: action.payload };
        case types.AUTHENTICATE:
            return { ...state, authenticated: true };
        case types.LOGIN_TOKEN:
            return { ...state, token: action.payload };
        case types.LOGOUT:
            return { ...state, authenticated: false, userInfo: null };
        default :
            return { ...state };
    }
}
