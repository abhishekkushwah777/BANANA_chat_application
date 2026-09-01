import { useEffect, useState } from "react";
import "../styles/chat.css";
import { getConversation } from "../api/conversation";
import MessageList from "./MessageList";
import { useAppContext } from "../appContexts";
import { connectSocket, disconnectSocket } from "../socket/socket";

function Chat() {
  const [message, setMessage] = useState("");
  const {messages, setMessages} = useAppContext();
  const { conversation, setConversation } = useAppContext();
  const { selectedUser } = useAppContext();
  const { socket, setSocket } = useAppContext();

  const user = selectedUser;

  console.log("Selected user:", user?._id);

  // --------------------------------------------------
  // 1. Fetch conversation when user changes
  // --------------------------------------------------
  useEffect(() => {
    if (!user?._id) {
      setConversation(null);
      setMessages(null);
      return;
    }

    async function loadConversation() {
      try {
        const { conversation, messages } = await getConversation(user._id);

        setConversation(conversation);
        setMessages(messages);
        console.log("messages:", messages);
      } catch (error) {
        console.error("Failed to fetch conversation:", error);

        setConversation(null);
        setMessages(null);
      }
    }

    loadConversation();
  }, [user?._id]);


  // --------------------------------------------------
  // 2. Connect socket when conversation is available
  // --------------------------------------------------
useEffect(() => {
  if (!user?._id) {
    return;
  }

  const conversationId = conversation._id;

  const newsocket = connectSocket();
  setSocket(newsocket);
  // Join conversation
  newsocket.emit("join_conversation", {
    conversationId,
  });

  console.log("Joining conversation:", conversationId);

  // Receive new messages
  const handleReceiveMessage = (newMessage) => {
    console.log("New message:", newMessage);

    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);
  };

  newsocket.on("receive_message", handleReceiveMessage);

  // Cleanup
  return () => {
    console.log("Leaving conversation:", conversationId);

    newsocket.off("receive_message", handleReceiveMessage);

    newsocket.emit("leave_conversation", {
      conversationId,
    });
    disconnectSocket();
    setSocket(null);
  };

}, [conversation?._id]);


  // --------------------------------------------------
  // Send message
  // --------------------------------------------------
  function sendMessage() {
    if (!message.trim()) {
      return;
    }

    if (!socket) {
      console.error("Socket is not connected");
      return;
    }

    if (!conversation?._id) {
      console.error("No conversation selected");
      return;
    }

    socket.emit("send_message", {
      conversationId: conversation._id,
      content: message.trim(),
    });

    setMessage("");
  }


  // --------------------------------------------------
  // Enter key
  // --------------------------------------------------
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }


  // --------------------------------------------------
  // No user selected
  // --------------------------------------------------
  if (!user?._id) {
    return (
      <p>
        Start a new conversation or select one!
      </p>
    );
  }


  // --------------------------------------------------
  // Conversation doesn't exist
  // --------------------------------------------------
  if (!conversation?._id) {
    return (
      <p>
        Start a new conversation or select one!
      </p>
    );
  }


  // --------------------------------------------------
  // Chat UI
  // --------------------------------------------------
  return (
    <div className="chat-screen">

      <div className="chat-header">
        <h2>
          {user?.username}
        </h2>
      </div>

      <MessageList />

      <div className="input-send">

        <textarea
          className="text-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}

export default Chat;