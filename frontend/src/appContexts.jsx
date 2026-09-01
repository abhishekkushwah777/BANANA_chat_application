import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
    const [conversation, setConversation] = useState(null);
    const [authenticatedUser, setAuthenticatedUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isloading, setIsLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState(null);

      useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem("token"); // 1. fetch token from storage

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/me", {           // 2. verify with backend
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          setAuthenticatedUser(true);
        } else {
          localStorage.removeItem("token"); // invalid/expired — clean up
          setAuthenticatedUser(false);
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        setAuthenticatedUser(false);
      } finally {
        setIsLoading(false); // 3. done checking, either way
      }
    }

    verifyToken();
  }, []);

  
  return (
    <AppContext.Provider value={{
        conversation,
        setConversation,
        authenticatedUser,
        setAuthenticatedUser,
        isloading,
        setIsLoading,
        socket,
        setSocket,
        selectedUser,
        setSelectedUser,
        messages,
        setMessages
     }}>
      {children}
    </AppContext.Provider>
  );
};
