import {combineReducers} from "redux";
import userReducer from "./reducer/userSlice";
import friendReducer from "./reducer/friendSlice";
import notificationReducer from "./reducer/notificationSlice";

const rootReducer = combineReducers({
    user: userReducer,
    notification: notificationReducer,
    friend: friendReducer,
    // 다른 리듀서들...
});

export default rootReducer;