import {
  Chats,
  Hash,
  MagnifyingGlass,
  PushPin,
  Question,
  Tray,
  Users,
  Sun,
  Moon,
  PhoneCall,
  VideoCamera,
  UserPlus,
} from "@phosphor-icons/react";
import useDarkMode from "../hooks/useDarkMode";
import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import NotificationList from './NotificationList';
import '../index.css';
import ChannelChat from "./ChannelChat";
import {useParams} from "react-router-dom";
import VoiceCall from "./VoiceCall";
import VideoCall from "./VideoCall";

const customStyles = {
  content: {
    position: 'absolute', // 모달을 절대적 위치로 설정
    top: '53px', // 모달 트리거 요소 아래에 위치
    left: '87%', // 화면의 가운데로부터 왼쪽으로 어느 정도 떨어진 위치에 모달이 나타나도록 조정
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, 0)', // X축으로만 이동
    width: '20rem', // 모달의 너비
    zIndex: 1000, // 모달의 z-index를 충분히 높게 설정
  },
  overlay: {
    position: 'fixed', // 오버레이를 화면에 고정
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent' // 배경색 투명으로 설정
  },
};

Modal.setAppElement('#root');

const ChannelBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("channelChat");
  const { roomId, channelName } = useParams();

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    setActiveComponent("channelChat");
  }, [channelName]);

  //음성통화
  const handleVoiceCallClick = () => {
    setActiveComponent("voiceCall");
    console.log("Active component set to voiceCall");
  };

  //영상통화
  const handleVideoCallClick = () => {
    setActiveComponent("videoCall");
  };

  //현재 활성화된 컴포넌트를 렌더링하는 로직
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "voiceCall":
        return <VoiceCall />;
      case "videoCall":
        return <VideoCall roomId={roomId}/>;
      case "channelChat":
      default:
        return <ChannelChat />;
    }
  };

  return (
      <>
        <div className="relative flex h-12 w-full items-center justify-between py-3 px-4">
          <div className="relative flex min-w-0 flex-auto items-center overflow-hidden">
            <Hash className="mr-2 overflow-hidden text-gray-500" size={24}/>
            <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {channelName}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeIcon/>
            <IconButton icon={"phoneCall"} tooltipText={"음성통화 하기"} onClick={handleVoiceCallClick}/>
            <IconButton icon={"videoCamera"} tooltipText={"영상통화 하기"} onClick={handleVideoCallClick}/>
            <IconButton icon={"userPlus"} tooltipText={"개인 메세지에 친구 추가하기"}/>
            <SearchBar/>
            <IconButton icon={"inbox"} tooltipText={"받은 알림함"} onClick={openModal}/>
            <IconButton icon={"question"} tooltipText={"Help"}/>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Notification Modal"
            >
              <NotificationList/>
            </Modal>
          </div>
        </div>
        {renderActiveComponent()}</>
  );
};

const SearchBar = () => {
  return (
    <div className="flex items-center justify-end">
      <input
        type="text"
        placeholder="Search"
        className="h-6 w-36 rounded p-2 text-sm outline-none transition-all
                   duration-300 ease-in-out focus:w-60
                   motion-reduce:transition-none motion-reduce:focus:transform-none
                   dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500
                   bg-gray-300 text-gray-800 placeholder-gray-600"
      />
      <MagnifyingGlass className="absolute mr-2 dark:text-gray-400" />
    </div>
  );
};

const IconButton = ({ icon, tooltipText, onClick }) => {
  const iconProps = {
    className:
      "cursor-pointer dark:text-gray-400 dark:hover:text-gray-200 text-gray-600 hover:text-gray-800",
    weight: "fill",
    size: 24,
  };

  let iconEl;
  switch (icon) {
    case "phoneCall":
      iconEl = <PhoneCall {...iconProps} />;
      break;
    case "videoCamera":
      iconEl = <VideoCamera {...iconProps} />;
      break;
    case "userPlus":
      iconEl = <UserPlus {...iconProps} />;
      break;
    case "pin":
      iconEl = <PushPin {...iconProps} />;
      break;
    case "question":
      iconEl = <Question {...iconProps} />;
      break;
    case "inbox":
      iconEl = <Tray {...iconProps} onClick={onClick}/>;
      break;
    case "users":
      iconEl = <Users {...iconProps} />;
      break;
    default:
      break;
  }

  return (
    <div className="group relative flex flex-col items-center" onClick={onClick}>
      {iconEl}
      <Tooltip text={tooltipText} />
    </div>
  );
};

const Tooltip = ({ text = "Hello" }) => {
  return (
    <div
      className="pointer-events-none absolute top-full mt-1 hidden
                 flex-col items-center group-hover:flex"
    >
      <div className="-mb-2 h-3 w-3 rotate-45 bg-white dark:bg-black"></div>
      <div
        className="relative min-w-max rounded bg-white py-1.5 px-3 text-sm
                 text-gray-900 shadow-lg dark:bg-black dark:text-gray-100"
      >
        {text}
      </div>
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <Sun
          size="24"
          weight="fill"
          className="cursor-pointer text-gray-600
                      transition duration-300 ease-in-out
                      hover:text-pink-400
                      dark:text-gray-400 hover:dark:text-pink-400"
        />
      ) : (
        <Moon
          size="24"
          weight="fill"
          className="cursor-pointer text-gray-600
                      transition duration-300 ease-in-out
                      hover:text-pink-400
                      dark:text-gray-400 hover:dark:text-pink-400"
        />
      )}
    </span>
  );
};

export default ChannelBar;
