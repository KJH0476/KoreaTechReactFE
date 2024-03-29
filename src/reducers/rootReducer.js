import {combineReducers} from "redux";
import userReducer from "./reducer/userSlice";
import friendReducer from "./reducer/friendSlice";
import notificationReducer from "./reducer/notificationSlice";
import chatRoomSlice from "./reducer/chatRoomSlice";

const rootReducer = combineReducers({
    user: userReducer,
    notification: notificationReducer,
    friend: friendReducer,
    chatRoom: chatRoomSlice,
    // 다른 리듀서들...
});

export default rootReducer;