// 액션 타입 정의
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

// 액션 생성자 정의
export const addNotification = (notification) => ({
    type: ADD_NOTIFICATION,
    payload: notification,
});

export const removeNotification = (id) => ({
    type: REMOVE_NOTIFICATION,
    payload: id,
});
