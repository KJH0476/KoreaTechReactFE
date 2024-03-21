import { LOGIN_SUCCESS, LOGOUT } from '../actions/userActions';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        default:
            return state;
    }
};

export default userReducer;
