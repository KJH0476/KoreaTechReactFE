import React, {useState} from 'react';
import SideBar from './components/SideBar.jsx';
import ServerSideBar from './components/ServerSideBar';
import ChannelContent from './components/Channel';
import ChannelBar from './components/ChannelBar';
import UserBar from './components/UserBar';
import SignIn from './components/SignIn';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            {!isLoggedIn ? (
                <SignIn onLoginSuccess={handleLoginSuccess}/>
            ) : (
                <div className='flex'>
                    <SideBar/>
                    <div className='flex flex-col'>
                        <ServerSideBar/>
                        <UserBar/>
                    </div>
                    <div className="relative flex w-full flex-col dark:bg-gray-700">
                        <ChannelBar channelName={"hello"}/>
                        <Divider/>
                    </div>
                </div>
            )}
        </Router>
    );
}

const Divider = () => (
    <hr
        className="m-0 w-full border
                border-gray-400 bg-gray-400 p-0
                dark:border-gray-800 dark:bg-gray-800"
    />
);

export default App;
