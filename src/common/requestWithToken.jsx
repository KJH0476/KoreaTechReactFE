import axios from 'axios';
import {actions as userActions} from "../reducers/reducer/userSlice";
import {actions as friendActions} from "../reducers/reducer/friendSlice";
import {disconnectWebsocket} from "./webSocketService";

export function sendRequestWithToken(apiEndpoint, requestData, method, dispatch) {
    let accessToken = localStorage.getItem('token');

    // Setup axios options
    let axiosOptions = {
        method: method,
        url: process.env.REACT_APP_SERVER_URL + apiEndpoint,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
    };

    if (method === 'POST') {
        axiosOptions.data = requestData;
    }

    return axios(axiosOptions)
        .then(async response => {
            // No need to check for 401 here, axios will throw an error
            return { status: response.status, data: response.data };
        })
        .catch(async error => {
            console.log(error.response.data);
            if (error.response.data && error.response.status === 401) {
                const errorMessage = error.response.data.message;
                //만료된 토큰 삭제
                //window.localStorage.removeItem('token');
                console.log(errorMessage);
                //새로운 토큰을 발급받았을 경우에 다시 로컬 스토리지에 토큰 저장후 재요청
                if(errorMessage==='NEW_ACCESS_TOKEN') {
                    const newToken = error.response.data.token;
                    //새로운 액세스 토큰으로 교체
                    window.localStorage.setItem('token', newToken);
                    //Authorization 헤더에 새로운 액세스 토큰 추가
                    axiosOptions.headers['Authorization'] = `Bearer ${newToken}`;

                    console.log("새로운 액세스 토큰으로 재요청");
                    return axios(axiosOptions)
                        .then(res => ({ status: res.status, data: res.data }))
                        .catch(error => {throw new Error('Refresh token expired')});
                }
                else {
                    console.log("리프레시 토큰도 만료, 로그아웃처리");
                    disconnectWebsocket(dispatch);
                    await dispatch(userActions.logout()); // 로그아웃 액션 디스패치
                    await dispatch(friendActions.clearFriends()); // 친구 목록 초기화
                }
            } else {
                // Handle other errors
                throw error;
            }
        });
}