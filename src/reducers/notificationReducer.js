import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/notificationActions';

const initialState = {
    notifications: [],
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            // notifications 배열에서 가장 큰 id 값을 찾음
            const maxId = state.notifications.reduce((max, notification) => Math.max(notification.id, max), -1);
            // 새 알림에 대해 maxId + 1 값을 id로 사용
            const newNotification = { id: maxId + 1 , message: action.payload };
            return {
                ...state,
                notifications: [...state.notifications, newNotification],
            };
        case REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(notification => notification.id !== action.payload),
            };
        default:
            return state;
    }
};

export default notificationReducer;
