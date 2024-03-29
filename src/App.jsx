import SideBar from './components/SideBar.jsx';
import ServerSideBar from './components/ServerSideBar';
import UserBar from './components/UserBar';
import SignIn from './components/SignIn';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import WebSocketConnection from './components/WebSocketConnection';
import FriendHome from "./components/FriendHome";
import {LoadUserInformation} from './components/LoadUserInformation';
import { useSelector } from 'react-redux';
import ChannelChat from "./components/ChannelChat";
import ChannelBar from "./components/ChannelBar";

function App() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const isLoading = useSelector(state => state.user.loading);

    return (
        <Router>
            {!isLoggedIn ? (
                <SignIn />
            ) : (
                <>
                    {!isLoading && <LoadUserInformation />}
                    <WebSocketConnection />
                    <div className='flex'>
                        <SideBar />
                        <div className='flex flex-col'>
                            <ServerSideBar />
                            <UserBar />
                        </div>
                        <div className="relative flex w-full flex-col dark:bg-gray-700">
                            <Routes>
                                <Route path="/" element={<FriendHome />} />
                                <Route path="/channel/:roomId/:channelName" element={<ChannelBar />} />
                            </Routes>
                        </div>
                    </div>
                </>
            )}
        </Router>
    );
}

export default App;
