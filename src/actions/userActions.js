import { connectWebsocket, disconnectWebsocket } from "../common/webSocketService";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// 로그인 액션 생성자
export const loginSuccess = (userInfo) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: userInfo,
        });
        // 웹소켓 연결 시도
        connectWebsocket(process.env.REACT_APP_SERVER_URL+"/ws", dispatch, userInfo.id, userInfo.email);
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            // 서버에 로그아웃 요청
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
                method: 'POST',
            });

            if (response.ok) {
                // 로컬 스토리지에서 토큰 삭제
                window.localStorage.removeItem('token');
                // 로그아웃 액션 디스패치
                dispatch({ type: LOGOUT });
                //웹소켓 연결 해제
                disconnectWebsocket();
            } else {
                // 에러 처리
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Logout request failed:', error);
        }
    };
};
