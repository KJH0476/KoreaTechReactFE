import React, { useEffect, useRef } from 'react';
import {sendOffer, peerConfig} from "../common/peerConfig";

const VideoCall = (roomId) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => {
        // 로컬 미디어 스트림 획득
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideoRef.current.srcObject = stream; // 로컬 비디오 설정

                const pc = new RTCPeerConnection(); // PeerConnection 인스턴스 생성
                stream.getTracks().forEach(track => pc.addTrack(track, stream)); // 스트림 트랙 추가

                // 웹소켓 및 WebRTC 설정
                peerConfig(roomId); // WebRTC 설정 및 이벤트 리스너 구독
                sendOffer(pc, roomId); // 오퍼 전송

                pc.ontrack = event => {
                    remoteVideoRef.current.srcObject = event.streams[0]; // 리모트 비디오 설정
                };
            })
            .catch(error => {
                console.error('미디어 스트림 획득 실패:', error);
            });

        return () => {
            // 여기에 컴포넌트 언마운트 시 필요한 자원 정리 로직 추가
        };
    }, [roomId]);

    return (
        <div>
            <video ref={localVideoRef} autoPlay playsInline muted></video>
            <video ref={remoteVideoRef} autoPlay playsInline></video>
        </div>
    );
};

export default VideoCall;
