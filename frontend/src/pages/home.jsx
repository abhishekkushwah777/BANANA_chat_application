import {React,useEffect } from "react";
import UserList from "../components/userList";
import { connectSocket, disconnectSocket } from "../socket/socket";
import Chat from "../components/chat";
import { logoutUser } from "../api/auth";
import { useAppContext } from "../appContexts";
import "../styles/home.css";



function Home() {
    const { setAuthenticatedUser } = useAppContext();
    const {selectedUser, setSelectedUser} = useAppContext();


    return (
        <div className="home-page">
            <header>
                <h1>🍌 BANANA</h1>
                <button
                onClick={() => {
                    logoutUser();
                    setAuthenticatedUser(false);
                }}
                >Logout</button>
            </header>
            <main>
                <div className="userlist">
                    <UserList 
                     onselectUser = {setSelectedUser} 
                    />
                </div>
                <div className="chat">
                    <Chat 
                    user = {selectedUser}
                    />
                </div>
            </main>
    </div>
    )
}
export default Home;